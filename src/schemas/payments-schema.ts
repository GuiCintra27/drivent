import { Payment } from "@/repositories/payments-repository";
import Joi from "joi";

export const paymentSchema = Joi.object<Payment>({
  ticketId: Joi.number().required(),
  cardData: Joi.object({
    issuer: Joi.string().valid("VISA", "MASTERCARD").required(),
    number: Joi.string().min(13).max(16).required(),
    name: Joi.string().required(),
    expirationDate: Joi.string().isoDate().required(),
    cvv: Joi.string().length(3).required(),
  }).required()
});

export const getPaymentSchema = Joi.object({
  ticketId: Joi.number().required(),
});
