import { Request, Response } from "express";
import { bookingService } from "./booking.services";

const createBooking = async (req: Request, res: Response) => {
  try {
    const { customer_id, vehicle_id, rent_start_date, rent_end_date } = req.body;

    if (!customer_id || !vehicle_id || !rent_start_date || !rent_end_date) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const result= await bookingService.createBookingDB( customer_id, vehicle_id,rent_start_date, rent_end_date);

    console.log(result)
    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
      errors:err
    });
  }
};

const getAllBooking = async (req: Request, res: Response) => {
  try {
    const role = req.user?.role as string;
    const id = req.user?.id as number;
    const result = await bookingService.getAllBookingDB(role, id);
  console.log(result)
    return res.status(200).json({
      success: true,
      message:
        role === "admin"
          ? "Bookings retrieved successfully"
          : "Your bookings retrieved successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


const updateBooking = async (req: Request, res: Response) => {
  try {
    const bookingId = Number(req.params.bookingId);
    const { status } = req.body;
    const role = req.user?.role as string;
    const userId = req.user?.id as number;

    if (!status) {
      return res.status(400).json({ success: false, message: "Status is required" });
    }

    const updatedBooking = await bookingService.updateBookingDB(role, userId, bookingId, status);

    let message = "";
    if (status === "cancelled") message = "Booking cancelled successfully";
    else if (status === "returned") message = "Booking marked as returned. Vehicle is now available";
    else message = "Booking updated successfully";

    return res.status(200).json({
      success: true,
      message,
      data: updatedBooking,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const bookingController = {
  createBooking,
  getAllBooking,
  updateBooking
};
