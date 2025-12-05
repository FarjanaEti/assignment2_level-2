import express from "express";
import { bookingController } from "./booking.controllers";

const router = express.Router();
router.post("/", bookingController.createBooking);

export const bookingRoutes=router;
