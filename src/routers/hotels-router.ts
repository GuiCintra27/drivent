import { Router } from "express";
import { authenticateToken, validateParams } from "@/middlewares";
import { getHotels, getHotelWithId } from "@/controllers";
import { hotelIdSchema } from "@/schemas/hotels-schema";

const hotelsRouter = Router();

hotelsRouter
  .all("/*", authenticateToken)
  .get("/", getHotels)
  .get("/:hotelId", validateParams(hotelIdSchema), getHotelWithId);

export { hotelsRouter };
