import express from "express"
import { vehicleControllers } from "./vehicle.controllers";

const router= express.Router();

router.post('/',vehicleControllers.createVehicle);


export const vehicleRoutes=router;