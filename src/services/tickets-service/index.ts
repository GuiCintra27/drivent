import { notFoundError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketsRepository, { CreateTicket } from "@/repositories/tickets-repository";

async function createTicket(params: CreateTicket): Promise<void> {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(params.userId);

  if (!enrollment) throw notFoundError();

  await ticketsRepository.create({ ticketTypeId: params.ticketTypeId, enrollmentId: enrollment.id, status: "RESERVED" });
}

const enrollmentsService = {
  createTicket
};

export default enrollmentsService;
