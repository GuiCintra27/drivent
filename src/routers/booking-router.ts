import { Router } from "express";
import { authenticateToken, validateBody, validateParams } from "@/middlewares";
import { createBooking, getBooking, updateBooking } from "@/controllers";
import { bookingIdSchema, bookingRoomIdSchema } from "@/schemas/booking-schema";

const bookingRouter = Router();

bookingRouter
  .all("/*", authenticateToken)
  .get("/", getBooking)
  .post("/", validateBody(bookingRoomIdSchema), createBooking)
  .put("/:bookingId", validateParams(bookingIdSchema), validateBody(bookingRoomIdSchema), updateBooking);

export { bookingRouter };
