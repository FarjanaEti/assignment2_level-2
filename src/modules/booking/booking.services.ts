import { pool } from "../../config/db";


const createBookingDB = async (customer_id: number,vehicle_id: number,rent_start_date: string,rent_end_date: string
) => {
  const vehicleResult = await pool.query(
    `SELECT id, vehicle_name, daily_rent_price, availability_status
     FROM vehicles WHERE id=$1`,
    [vehicle_id]
  );

  if (vehicleResult.rows.length === 0) {
    throw new Error("Vehicle not found");
  }

  const vehicle = vehicleResult.rows[0];

  if (vehicle.availability_status === "booked") {
    throw new Error("Vehicle is already booked");
  }

  const start = new Date(rent_start_date);
  const end = new Date(rent_end_date);
  const duration = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

  if (duration <= 0) {
    throw new Error("End date must be after start date");
  }

  const total_price = duration * vehicle.daily_rent_price;

  const bookingResult = await pool.query(
    `INSERT INTO booking (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING id, customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status`,
    [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, "active"]
  );

  const booking = bookingResult.rows[0];
  booking.vehicle = {
    vehicle_name: vehicle.vehicle_name,
    daily_rent_price: vehicle.daily_rent_price
  };

  await pool.query(
    "UPDATE vehicles SET availability_status=$1 WHERE id=$2",
    ["booked", vehicle_id]
  );

  return booking;
};


const getAllBookingDB = async (role: string, userId: number) => {
  let query;
  let params: any[] = [];

  if (role === "admin") {
    query = `
      SELECT 
        b.*,
        u.name AS customer_name,
        u.email AS customer_email,
        v.vehicle_name,
        v.registration_number
      FROM booking b
      JOIN users u ON b.customer_id = u.id
      JOIN vehicles v ON b.vehicle_id = v.id
      ORDER BY b.id DESC
    `;
  } else {
    query = `
      SELECT 
        b.id,
        b.vehicle_id,
        b.rent_start_date,
        b.rent_end_date,
        b.total_price,
        b.status,
        v.vehicle_name,
        v.registration_number,
        v.type
      FROM booking b
      JOIN vehicles v ON b.vehicle_id = v.id
      WHERE b.customer_id = $1
      ORDER BY b.id DESC
    `;
    params = [userId];
  }

  const result = await pool.query(query, params);
  return result.rows;
};

const updateBookingDB = async (role: string, userId: number, bookingId: number, status: string) => {
  const bookingResult = await pool.query(
    `SELECT id, customer_id, vehicle_id, rent_start_date::date AS rent_start_date, rent_end_date::date AS rent_end_date, status
     FROM booking
     WHERE id=$1`,
    [bookingId]
  );

  if (bookingResult.rows.length === 0) {
    throw new Error("Booking not found");
  }

  const booking = bookingResult.rows[0];

  if (role === "customer") {
    if (booking.customer_id !== userId) {
      throw new Error("You can only cancel your own booking");
    }

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const bookingDay = new Date(booking.rent_start_date); // already only date

    if (today >= bookingDay) {
      throw new Error("Cannot cancel booking after start date");
    }

    if (status !== "cancelled") {
      throw new Error("Customers can only cancel bookings");
    }

    const result = await pool.query(
      `UPDATE booking SET status=$1 WHERE id=$2 RETURNING *`,
      [status, bookingId]
    );

    const cancellBooking = result.rows[0]
    await pool.query(
      `UPDATE vehicles SET availability_status='available' WHERE id=$1`,
      [cancellBooking.vehicle_id]
    );

    cancellBooking.vehicle = { availability_status: "available" }
    return cancellBooking
  }

  if (role === "admin") {
    if (status !== "returned") {
      throw new Error("Admin can only mark as returned");
    }

    const result = await pool.query(
      `UPDATE booking SET status=$1 WHERE id=$2 RETURNING *`,
      [status, bookingId]
    )

    const updatedBooking = result.rows[0]

    await pool.query(
      `UPDATE vehicles SET availability_status='available' WHERE id=$1`,
      [updatedBooking.vehicle_id]
    )

    updatedBooking.vehicle = { availability_status: "available" }
    return updatedBooking
  }

  throw new Error("Unauthorized action")
};

export const bookingService = {
  createBookingDB,
  getAllBookingDB,
  updateBookingDB
};
