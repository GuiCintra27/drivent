import { notFoundError } from "@/errors";
import hotelRepository from "@/repositories/hotel-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import { paymentError } from "@/errors/payment-required-error";
import ticketRepository from "@/repositories/ticket-repository";
import { Hotel, Room } from "@prisma/client";

async function gethotels(userId: number): Promise<Hotel[]> {
  await haveEnrollmentAndTicket(userId);

  const hotels = await hotelRepository.findMany();

  if (!hotels) {
    throw notFoundError();
  }

  return hotels;
}

async function getHotelWithId(userId: number, hotelId: number): Promise<HotelWithRooms> {
  await haveEnrollmentAndTicket(userId);

  const hotel = await hotelRepository.findHotelById(hotelId);

  if (!hotel || hotel.Rooms.length === 0) {
    throw notFoundError();
  }

  return hotel;
}

async function haveEnrollmentAndTicket(userId: number): Promise<void> {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!enrollment) {
    throw notFoundError();
  }

  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);

  if (!ticket) {
    throw notFoundError();
  }

  if (ticket.TicketType.isRemote === true || !ticket.TicketType.includesHotel === true || ticket.status !== "PAID") {
    throw paymentError("The payment was not effetued or ticketType not includes hotel");
  }
}

type HotelWithRooms = Hotel & {Rooms: Room[]};

export type HotelIdParams = { hotelId: number };

const hotelService = {
  gethotels,
  getHotelWithId,
};

export default hotelService;
