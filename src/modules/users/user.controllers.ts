import { Request, Response } from "express";
import { userServices } from "./user.services";
import { error } from "console";


const createUser=async(req:Request, res:Response)=>{
    try {
    const result = await userServices.createUserDB(req.body)

     //console.log(result.rows[0]);
    res.status(201).json({
      success: true,
      message: "Data Inserted Successfully",
      data: result.rows[0],
    });
  }
    catch(err:any){
       res.status(500).json({
      success: false,
      message: err.message,
      error:err
    });
    }

}

const getUser=async (req: Request, res: Response) => {
  try {
    const result =await userServices.getUserDB();
  
    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      datails: err,
    });
  }
}

const getSingleUser=async (req: Request, res: Response) => {

  try {
    const result = await userServices.getSingleUserDB(req.params.id as string);
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Single user retrieved successfully",
        data: result.rows[0],
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

const updateUser=async (req: Request, res: Response) => {
  const { name,email,phone,role } = req.body;
  try {
    const result = await userServices.updateUserDB(name, email,phone,role, req.params.id!);
//   console.log(result)
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: result.rows[0],
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const deleteUser= async (req: Request, res: Response) => {
  try {
    const result = await userServices.deleteUserDB(req.params.id!);

    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User deleted successfully",
        
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const userCollectors={
      createUser  ,
      getUser,
      getSingleUser ,
      updateUser ,
      deleteUser                  
}