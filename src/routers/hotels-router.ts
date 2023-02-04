import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getHotels, getHotelWithId } from "@/controllers";

const hotelsRouter = Router();

hotelsRouter
  .all("/*", authenticateToken)
  .get("/", getHotels)
  .get("/:hotelID", getHotelWithId)

export { hotelsRouter };
