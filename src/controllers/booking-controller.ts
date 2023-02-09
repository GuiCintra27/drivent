import { AuthenticatedRequest } from "@/middlewares";
import bookingService from "@/services/booking-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const booking = await bookingService.getBooking(userId);

    return res.status(httpStatus.OK).send(booking);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error);
    }

    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export async function createBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { roomId } = req.body;

  try {
    const booking = await bookingService.createBooking(userId, parseInt(roomId));

    return res.status(httpStatus.OK).send(booking);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error);
    }

    if (error.name === "PaymentRequiredError") {
      return res.status(httpStatus.PAYMENT_REQUIRED).send(error);
    }

    if (error.name === "ForbiddenError") {
      return res.status(httpStatus.FORBIDDEN).send(error);
    }

    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export async function updateBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { roomId } = req.body;
  const { bookingId } = req.params;

  try {
    const booking = await bookingService.updateBooking(userId, parseInt(roomId), parseInt(bookingId));

    return res.status(httpStatus.OK).send(booking);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error);
    }

    if (error.name === "ForbiddenError") {
      return res.status(httpStatus.FORBIDDEN).send(error);
    }

    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

