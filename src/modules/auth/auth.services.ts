import config from "../../config";
import { pool } from "../../config/db";
import jwt from 'jsonwebtoken';

const signupUserDB = async (name: string, email: string, password: string , phone:string, role:string) => {
  const exists = await pool.query(
    `SELECT * FROM users WHERE email=$1`,
    [email]
  );

  if (exists.rows.length > 0) {
    throw new Error("Email already exists");
  }

  //const hashed = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `INSERT INTO users(name, email, password,phone,role)
     VALUES ($1, $2, $3,$4,$5)
     RETURNING id, name, email, phone,role`,
    [name, email, password,phone,role]
  );

  return  result;

//   const token = jwt.sign(
//     { id: user.id, email: user.email },
//     config.jwtSecret,
//     { expiresIn: "7d" }
//   );

  //return { user };
};

const signinUserDB = async (email: string, password: string) => {
  const result = await pool.query(
    `SELECT * FROM users WHERE email = $1`,
    [email]
  );

  if (result.rows.length === 0) {
    throw new Error("User not found");
  }

  const user = result.rows[0];

  // if you haven't added bcrypt yet:
  if (user.password !== password) {
    throw new Error("Invalid password");
  }

  // remove password before sending
  delete user.password;
 
   const token= jwt.sign({name:user.name, email:user.email, role:user.role},config.jwtSecret as string,{
  expiresIn:"7d"
  })
//console.log(token);

  return { token,user };
};



export const authServices={
    signupUserDB ,
    signinUserDB                         
}