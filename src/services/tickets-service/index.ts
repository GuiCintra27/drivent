import { notFoundError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketsRepository, { CreateTicket, FindTicket } from "@/repositories/tickets-repository";
import { TicketType } from "@prisma/client";

async function findTicketType(): Promise<TicketType[]> {
  const ticketType = await ticketsRepository.findMany();

  if (!ticketType) {
    throw notFoundError();
  }

  return ticketType;
}

async function findTickets(userId: number): Promise<FindTicket[]> {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!enrollment) throw notFoundError();

  const tickets = await ticketsRepository.find(enrollment.id);

  if (!tickets) throw notFoundError();

  return tickets;
}

async function findTicket(ticketId: number): Promise<FindTicket> {
  const ticket = await ticketsRepository.findUnique(ticketId);

  return ticket;
}

async function createTicket(params: CreateTicket): Promise<FindTicket[]> {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(params.userId);

  if (!enrollment) throw notFoundError();

  await ticketsRepository.create({ ticketTypeId: params.ticketTypeId, enrollmentId: enrollment.id, status: "RESERVED" });

  const ticket = await ticketsRepository.find(enrollment.id);

  return ticket;
}

const ticketsService = {
  findTicketType,
  findTicket,
  findTickets,
  createTicket
};

export default ticketsService;
