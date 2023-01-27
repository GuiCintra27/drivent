import { prisma } from "@/config";
import { Ticket, TicketStatus } from "@prisma/client";

async function create(params: CreateTicketRepository): Promise<Ticket> {
  return prisma.ticket.create({
    data: params
  });
}

const ticketsRepository = {
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
