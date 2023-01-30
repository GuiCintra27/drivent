import { prisma } from "@/config";
import { Ticket, TicketStatus, TicketType } from "@prisma/client";

async function findMany(): Promise<TicketType[]> {
  return prisma.ticketType.findMany();
}

async function find(enrollmentId: number): Promise<FindTicket[]> {
  return prisma.ticket.findMany({
    where: { enrollmentId },

    include: {
      TicketType: true
    }
  });
}

async function findUnique(ticketId: number): Promise<FindTicket> {
  return prisma.ticket.findUnique({
    where: { id: ticketId },
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

async function update(ticketId: number): Promise<void> {
  prisma.ticket.update({
    where: { id: ticketId },
    data: {
      status: "PAID"
    }
  });
}

const ticketsRepository = {
  find,
  findUnique,
  findMany,
  create,
  update
};

export default ticketsRepository;

export type FindTicket = {
  id: number,
  status: string,
  ticketTypeId: number,
  enrollmentId: number,
  TicketType: {
    id: number,
    name: string,
    price: number,
    isRemote: boolean,
    includesHotel: boolean,
    createdAt: Date,
    updatedAt: Date,
  },
  createdAt: Date,
  updatedAt: Date,
}

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
