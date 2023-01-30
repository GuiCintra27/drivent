import { prisma } from "@/config";
import { Payment as PrismaPayment } from "@prisma/client";

async function findUnique(ticketId: number): Promise<GetPayment> {
  return prisma.payment.findUnique({
    where: { id: ticketId }
  });
}

async function create(params: CreatePayment): Promise<PrismaPayment> {
  return prisma.payment.create({
    data: params
  });
}

const paymentsRepository = {
  findUnique,
  create
};

export default paymentsRepository;

type CreatePayment = {
  ticketId: number,
  value: number,
  cardIssuer: string,
  cardLastDigits: string
}

export type GetPayment = CreatePayment & { id: number, createdAt: Date, updatedAt: Date, }

export type Payment = {
  ticketId: number,
  cardData: {
    issuer: string,
    number: string,
    name: string,
    expirationDate: Date,
    cvv: string
  }
}

export type PaymentData = { userId: number } & Payment;
