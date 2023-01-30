import { Router } from "express";
import { authenticateToken, validateBody, validateQuery } from "@/middlewares";
import { getPaymentSchema, paymentSchema } from "@/schemas/payments-schema";
import { getPayment, postPayment } from "@/controllers/payments-controller";

const paymentsRouter = Router();

paymentsRouter
  .all("/*", authenticateToken)
  .get("/", validateQuery(getPaymentSchema), getPayment)
  .post("/", validateBody(paymentSchema), postPayment);

export { paymentsRouter };
