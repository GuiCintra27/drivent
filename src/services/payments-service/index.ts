import { notFoundError, unauthorizedError } from "@/errors";
import ticketsService from "@/services/tickets-service";
import { GetPayment, PaymentData } from "@/repositories/payments-repository";
import paymentsRepository from "@/repositories/payments-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import { Payment } from "@prisma/client";
import ticketsRepository from "@/repositories/tickets-repository";

async function getPayment(userId: number, ticketId: string): Promise<GetPayment> {
  const payment = await paymentsRepository.findUnique(parseInt(ticketId));

  if (!payment) throw notFoundError();

  const ticket = await ticketsService.findTicket(parseInt(ticketId));

  if (!ticket) throw notFoundError();

  const enrollment = await enrollmentRepository.findMany(userId);

  const ticketOwner = enrollment.map(item => item.id === ticket.enrollmentId);

  if (ticketOwner.length === 0) throw unauthorizedError();

  return payment;
}

async function createPayment({ userId, ticketId, cardData }: PaymentData): Promise<Payment> {
  const ticket = await ticketsService.findTicket(ticketId);

  if (!ticket) throw notFoundError();

  const enrollment = await enrollmentRepository.findMany(userId);

  const ticketOwner = enrollment.map(item => item.id === ticket.enrollmentId);

  if (ticketOwner.length === 0) throw unauthorizedError();

  const createPayment = {
    ticketId,
    value: ticket.TicketType.price,
    cardIssuer: cardData.issuer,
    cardLastDigits: cardData.number.substr(-4)
  };

  const payment = await paymentsRepository.create(createPayment);

  await ticketsRepository.update(ticketId);

  return payment;
}

const paymentsService = {
  getPayment,
  createPayment
};

export default paymentsService;
