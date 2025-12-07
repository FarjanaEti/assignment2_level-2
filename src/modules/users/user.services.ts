import { pool } from "../../config/db";
import bcrypt from "bcryptjs";


const createUserDB=async(payload :Record<string, unknown>)=>{
  const {name,email, password, phone,role}=payload;

  const hashedPass=await bcrypt.hash(password as string, 10); 

const result = await pool.query(
  `INSERT INTO users(name, email, password, phone, role) VALUES($1, $2, $3, $4, $5) RETURNING *`,
   [name, email,hashedPass,phone,role]
  );
  return result;
}

const getUserDB=async()=>{
  const result=await pool.query(`SELECT * FROM users`)
  return result;
}

const getSingleUserDB=async(userId:string)=>{
  const result=await pool.query(`SELECT * FROM users WHERE id = $1`, [userId]);
   return result
}

const updateUserDB = async (name: string, email: string, phone: string, role: string, userId: string) => {
  
   let query,values;
   if (role !== null && role !== undefined) {
    query = `
      UPDATE users 
      SET name=$1, email=$2, phone=$3, role=$4 
      WHERE id=$5 
      RETURNING *`;
   values = [name, email, phone, role, userId];
  } else {
    query = `
      UPDATE users 
      SET name=$1, email=$2, phone=$3
      WHERE id=$4 
      RETURNING *`;
    values = [name, email, phone, userId];
  }

  const result = await pool.query(query, values);
  delete result.rows[0].password;
  return result;
};

const deleteUserDB = async (userId: string) => {
  const bookingCheck = await pool.query(
    `SELECT COUNT(*) FROM booking WHERE user_id = $1`,
    [userId]
  );
  
  const hasBookings = parseInt(bookingCheck.rows[0].count, 10);

  if (hasBookings > 0) {
    throw new Error("Cannot delete user: Active bookings exist.");
  }

  const result = await pool.query(
    `DELETE FROM users WHERE id = $1`, 
    [userId]
  );

  return result;
};

export const userServices={
      createUserDB ,
      getUserDB ,
      getSingleUserDB,
      updateUserDB,
      deleteUserDB                     
}