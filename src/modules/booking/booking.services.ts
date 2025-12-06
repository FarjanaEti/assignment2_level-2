import { pool } from "../../config/db";

const createBookingDB = async (customer_id: number,vehicle_id: number,rent_start_date: string,rent_end_date: string) => {
 
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
  //todo= response structure

  const result = await pool.query(query, params);
  return result.rows;
};




export const bookingService = {
  createBookingDB,
  getAllBookingDB

};
