import { Router } from "express";
import { authenticateToken, validateParams } from "@/middlewares";
import { createBooking, getBooking, updateBooking } from "@/controllers";
import { bookingRoomIdSchema } from "@/schemas/booking-schema";

const bookingRouter = Router();

bookingRouter
  .all("/*", authenticateToken)
  .get("/", getBooking)
  .post("/", validateParams(bookingRoomIdSchema), createBooking)
  .put("/:bookingId", validateParams(bookingRoomIdSchema), updateBooking);

export { bookingRouter };
