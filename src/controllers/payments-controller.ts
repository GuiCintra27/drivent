import { AuthenticatedRequest } from "@/middlewares";
import paymentsService from "@/services/payments-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getPayment(req: AuthenticatedRequest, res: Response) {
  const { ticketId } = req.query;
  const { userId } = req;  

  try {
    const payment = await paymentsService.getPayment(userId, ticketId.toString());  

    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }  

    return res.status(httpStatus.BAD_GATEWAY).send(error);
  }
}

export async function postPayment(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { ticketId, cardData } = req.body;
  const paymentData = {
    userId,
    ticketId,
    cardData
  } as PaymentData;  

  try {
    const createPayment = await paymentsService.createPayment(paymentData);  
    return res.status(httpStatus.OK).send(createPayment);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }  

    if (error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    } 

    return res.sendStatus(httpStatus.BAD_GATEWAY);
  }
}

type PaymentData = {
  userId: number,
  ticketId: number,
  cardData: {
    issuer: string,
    number: string,
    name: string,
    expirationDate: Date,
    cvv: string
  }
}
