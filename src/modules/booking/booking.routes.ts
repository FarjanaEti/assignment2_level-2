import express from "express";
import { bookingController } from "./booking.controllers";
import auth from "../../middleware/auth";

const router = express.Router();
router.post("/", bookingController.createBooking);
router.get("/",auth('admin', 'customer'), bookingController.getAllBooking);
router.put("/:bookingId", auth("admin", "customer"), bookingController.updateBooking);

export const bookingRoutes=router;
