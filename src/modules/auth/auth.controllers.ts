import { Request, Response } from "express";
import { authServices } from "./auth.services";


const signupUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password,phone,role } = req.body;

    const result = await authServices.signupUserDB(name, email, password,phone,role);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

const signinUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const result = await authServices.signinUserDB(email, password);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};


export const authController={
     signupUser ,
     signinUser                       
}
