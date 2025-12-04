import { Request, Response } from "express";
import { vehicleServices } from "./vehicle.services";

const createVehicle=async(req:Request, res:Response)=>{
    try {
    const result = await vehicleServices.createVehicleDB(req.body)
    res.status(201).json({
      success: true,
      message: "Vehicle created successfully",
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

//TODO= if empty dataset
const getVehicles=async (req: Request, res: Response) => {
  try {
    const result =await vehicleServices.getVehiclesDB();
  
    res.status(200).json({
      success: true,
      message: "Vehicles retrieved successfully",
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

const getSingleVehicles=async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.getSingleVehiclesDB(req.params.id as string);
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Vehicle retrieved successfully",
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

const updateVehicles=async (req: Request, res: Response) => {
  const { vehicle_name,daily_rent_price,availability_status } = req.body;
  try {
    const result = await vehicleServices.updateVehiclesDB(vehicle_name,daily_rent_price,availability_status, req.params.id!);
//   console.log(result)
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Vehicle updated successfully",
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

const deleteVehicles= async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.deleteVehiclesDB(req.params.id!);

    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "vehicle not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Vehicle deleted successfully",
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


export const vehicleControllers={
     createVehicle ,
     getVehicles,
     getSingleVehicles,
     updateVehicles,
     deleteVehicles
                           
}