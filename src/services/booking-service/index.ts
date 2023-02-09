import { notFoundError, forbiddenError, paymentError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";
import { Room } from "@prisma/client";
import bookingRepository from "@/repositories/booking-repository";

async function getBooking(userId: number): Promise<BookingWithRoom> {
  const booking = await bookingRepository.findBookingByUserId(userId);

  if (!booking) throw notFoundError();

  const room = await bookingRepository.findRoomById(booking.roomId);

  return {
    id: booking.id,
    Room: {
      ...room
    }
  };
}

async function createBooking(userId: number, roomId: number): Promise<BookingId> {
  await haveEnrollmentAndTicket(userId);

  await availableRoom(roomId);

  const booking = await bookingRepository.createBooking(userId, roomId);

  return { bookingId: booking.id };
}

async function updateBooking(userId: number, roomId: number, bookingId: number): Promise<BookingId> {
  const bookingExists = await bookingRepository.findBookingById(bookingId);

  if (!bookingExists) throw notFoundError();

  const booking = await bookingRepository.findBookingByUserId(userId);

  if (!booking || bookingId !== booking.id) throw forbiddenError();

  await availableRoom(roomId);

  const newBooking = await bookingRepository.updateBooking(bookingId, roomId);

  return { bookingId: newBooking.id };
}

async function availableRoom(roomId: number): Promise<void> {
  const room = await bookingRepository.findRoomById(roomId);

  if (!room) throw notFoundError();

  const roomUsers = await bookingRepository.findRoomUsers(roomId);

  if (room.capacity === roomUsers.length) throw forbiddenError();
}

async function haveEnrollmentAndTicket(userId: number): Promise<void> {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!enrollment) throw notFoundError();

  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);

  if (!ticket) throw notFoundError();

  if (ticket.TicketType.isRemote === true || !ticket.TicketType.includesHotel === true || ticket.status !== "PAID") {
    throw paymentError("The payment was not effetued or ticketType not includes hotel");
  }
}

export type BookingBody = { roomId: number };
export type BookingId = { bookingId: number };
export type BookingWithRoom = { id: number } & { Room: Room };

const bookingService = {
  getBooking,
  createBooking,
  updateBooking,
};

export default bookingService;
