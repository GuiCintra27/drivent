import { notFoundError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketsRepository, { CreateTicket } from "@/repositories/tickets-repository";
import { Ticket, TicketType } from "@prisma/client";

async function findTicketType(): Promise<TicketType[]> {
  const ticketType = await ticketsRepository.findMany();

  return ticketType;
}

async function findTicket(userId: number): Promise<Ticket[]> {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!enrollment) throw notFoundError();

  const tickets = await ticketsRepository.find(enrollment.id);

  return tickets;
}

async function createTicket(params: CreateTicket): Promise<void> {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(params.userId);

  if (!enrollment) throw notFoundError();

  await ticketsRepository.create({ ticketTypeId: params.ticketTypeId, enrollmentId: enrollment.id, status: "RESERVED" });
}

const enrollmentsService = {
  findTicketType,
  findTicket,
  createTicket
};

export default enrollmentsService;
