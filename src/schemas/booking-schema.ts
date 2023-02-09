import { BookingBody, BookingId } from "@/services/booking-service";
import Joi from "joi";

export const bookingRoomIdSchema = Joi.object<BookingBody>({
  roomId: Joi.number().positive().required(),
});

export const bookingIdSchema = Joi.object<BookingId>({
  bookingId: Joi.number().positive().required(),
});
