import { Router } from "express";
import { getTickets, getTicketTypes, createTicket } from "@/controllers";
import { authenticateToken, validateBody } from "@/middlewares";
import { createTicketSchema } from "@/schemas/tickets-schema";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/types", getTicketTypes)
  .get("/", getTickets)
  .post("/", validateBody(createTicketSchema), createTicket);

export { ticketsRouter };
