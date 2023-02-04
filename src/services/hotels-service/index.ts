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

  console.log("Is remote: ", ticket.TicketType.isRemote, " / Includes hotel: ", !ticket.TicketType.includesHotel, " / Ticket paid: ", ticket.status !== "PAID")

  if(ticket.TicketType.isRemote || !ticket.TicketType.includesHotel || ticket.status !== "PAID"){
    throw paymentError("The payment was not effetued or ticketType not includes hotel");
  }
}

const hotelService = {
  gethotels,
  getHotelWithId,
};

export default hotelService;
