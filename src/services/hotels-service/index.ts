import { notFoundError } from "@/errors";
import hotelRepository from "@/repositories/hotel-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import { paymentError } from "@/errors/payment-required-error";
import ticketRepository from "@/repositories/ticket-repository";

async function gethotels(userId: number) {

  await haveEnrollmentAndTicket(userId);
  
  const hotels = await hotelRepository.findMany();

  if (!hotels) {
    throw notFoundError();
  }

  return hotels;
}

async function getHotelWithId(userId: number) {
    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
    if (!enrollment) {
        throw notFoundError();
    }
    const ticket = await hotelRepository.findTicketByEnrollmentId(enrollment.id);
    if (!ticket) {
        throw notFoundError();
    }
    
    return ticket;
}

async function haveEnrollmentAndTicket (userId: number): Promise<void>{
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!enrollment) {
    throw notFoundError();
  }

  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);

  if (!ticket) {
    throw notFoundError();
  }

  if(ticket.TicketType.isRemote === true || !ticket.TicketType.includesHotel === true || ticket.status !== "PAID"){
    throw paymentError("The payment was not effetued or ticketType not includes hotel");
  }
}

const hotelService = {
  gethotels,
  getHotelWithId,
};

export default hotelService;
