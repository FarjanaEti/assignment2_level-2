import { pool } from "../../config/db";

const createVehicleDB=async(payload :Record<string, unknown>)=>{
  const {vehicle_name,type,registration_number,daily_rent_price,availability_status}=payload;

const result = await pool.query(
  `INSERT INTO vehicles(vehicle_name,type,registration_number,daily_rent_price,availability_status)
   VALUES($1, $2, $3, $4, $5) RETURNING *`,
   [vehicle_name,type,registration_number,daily_rent_price,availability_status]
  );
  return result;
}

const getVehiclesDB = async () => {
  const result = await pool.query(`SELECT * FROM vehicles`)

  if (!result.rows || result.rows.length === 0) {
    return { rows: [], message: "No vehicles found" }
  }
  return { rows: result.rows, message: "Vehicles retrieved successfully" }
};


const getSingleVehiclesDB=async(id:string)=>{
  const result=await pool.query(`SELECT * FROM vehicles WHERE id = $1`, [id]);
   return result
}

const updateVehiclesDB = async (vehicle_name: string,daily_rent_price :number,availability_status:string, vehicleId: string) => {
  const result = await pool.query(
    `UPDATE vehicles SET vehicle_name=$1, daily_rent_price=$2, availability_status=$3 WHERE id=$4 RETURNING *`,
    [vehicle_name,daily_rent_price,availability_status,vehicleId]
  );
  return result;
};

const deleteVehiclesDB = async (vehicleId: string) => {

  const isActive=await pool.query(
        `SELECT 1 FROM booking WHERE vehicle_id = $1`,
       [vehicleId]
  )

  if (isActive.rows.length > 0) {
    throw new Error("Cannot delete active bookings vehicle")
  }

  const result = await pool.query(`DELETE FROM vehicles WHERE id = $1`, [vehicleId]);
  return result;
};

export const vehicleServices={
  createVehicleDB,
  getVehiclesDB,
  getSingleVehiclesDB,
  updateVehiclesDB,
  deleteVehiclesDB
}