import { prisma } from "@/config";
import { Ticket, TicketStatus, TicketType } from "@prisma/client";

async function findMany(): Promise<TicketType[]> {
  return prisma.ticketType.findMany();
}

async function find(enrollmentId: number): Promise<Ticket[]> {
  return prisma.ticket.findMany({
    where: { enrollmentId },

    include: {
      TicketType: true
    }
  });
}

async function create(params: CreateTicketRepository): Promise<Ticket> {
  return prisma.ticket.create({
    data: params
  });
}

const ticketsRepository = {
  findMany,
  find,
  create
};

export default ticketsRepository;

export type CreateTicketRepository = {
    ticketTypeId: number,
    enrollmentId: number,
    status: TicketStatus
};

export type CreateTicket = {
    userId: number,
    ticketTypeId: number
};

export type CreateTicketSchemaValidation = Omit<CreateTicket, "userId">;
