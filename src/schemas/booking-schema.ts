import { BookingBody } from "@/services/booking-service";
import Joi from "joi";

export const bookingRoomIdSchema = Joi.object<BookingBody>({
  roomId: Joi.number().positive().required(),
});
