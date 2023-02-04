import { HotelIdParams } from "@/services/hotels-service";
import Joi from "joi";

export const hotelIdSchema = Joi.object<HotelIdParams>({
  hotelId: Joi.number().positive().required(),
});
