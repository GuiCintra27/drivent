import { CreateTicketSchemaValidation } from "@/repositories/tickets-repository";
import Joi from "joi";

export const createTicketSchema = Joi.object<CreateTicketSchemaValidation>({
  ticketTypeId: Joi.number().required(),
});
