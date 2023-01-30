import { Router } from "express";
import { authenticateToken, validateBody, validateQuery } from "@/middlewares";
import { getPaymentSchema, paymentSchema } from "@/schemas/payments-schema";
import { getPayment, paymentProcess } from "@/controllers/payments-controller";

const paymentsRouter = Router();

paymentsRouter
  .all("/*", authenticateToken)
  .get("/", validateQuery(getPaymentSchema), getPayment)
  .post("/process", validateBody(paymentSchema), paymentProcess);

export { paymentsRouter };
