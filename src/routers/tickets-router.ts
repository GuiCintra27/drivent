import { Router } from "express";
import { getTickets, postTickets } from "@/controllers";
import { authenticateToken, validateBody } from "@/middlewares";
import { createTicketSchema } from "@/schemas/tickets-schema";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/", getTickets)
  .post("/", validateBody(createTicketSchema), postTickets);

export { ticketsRouter };
