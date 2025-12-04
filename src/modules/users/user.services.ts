import { pool } from "../../config/db";
import bcrypt from "bcryptjs";

const createUserDB=async(payload :Record<string, unknown>)=>{
  const {name,email, password, phone,role}=payload;

  //const hashedPass=await bcrypt.hash(password as string, 10); 

const result = await pool.query(
  `INSERT INTO users(name, email, password, phone, role) VALUES($1, $2, $3, $4, $5) RETURNING *`,
   [name, email,password,phone,role]
  );
  return result;
}

const getUserDB=async()=>{
//   const result=await pool.query(`SELECT * FROM users`)
//   return result;
//   console.log(result)
   const result = await pool.query(
 `
    SELECT id,name, email, password, phone, role FROM users
    `
  );
  console.log(result)
  return result;
}

export const userServices={
      createUserDB ,
      getUserDB                      
}