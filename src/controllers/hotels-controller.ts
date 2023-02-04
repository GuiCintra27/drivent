import { AuthenticatedRequest } from "@/middlewares";
import hotelService from "@/services/hotels-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getHotels(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const hotels = await hotelService.gethotels(userId);

    return res.status(httpStatus.OK).send(hotels);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error);
    }

    if (error.name === "PaymentRequiredError") {
      return res.status(httpStatus.PAYMENT_REQUIRED).send(error);
    }

    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export async function getHotelWithId(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { hotelId } = req.params;

  try {
    const hotel = await hotelService.getHotelWithId(userId, parseInt(hotelId));

    return res.status(httpStatus.OK).send(hotel);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error);
    }

    if (error.name === "PaymentRequiredError") {
      return res.status(httpStatus.PAYMENT_REQUIRED).send(error);
    }

    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}
