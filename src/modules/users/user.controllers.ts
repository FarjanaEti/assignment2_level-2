import { Request, Response } from "express";
import { userServices } from "./user.services";


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


export const userCollectors={
      createUser  ,
      getUser                      
}