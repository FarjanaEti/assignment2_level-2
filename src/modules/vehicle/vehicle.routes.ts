import express from "express"
import { vehicleControllers } from "./vehicle.controllers";
import auth from "../../middleware/auth";

const router= express.Router();

router.post('/',auth("admin"),vehicleControllers.createVehicle);
router.get('/',vehicleControllers.getVehicles);
router.get('/:vehicleId',vehicleControllers.getSingleVehicles);
router.put('/:vehicleId',auth("admin"),vehicleControllers.updateVehicles);
router.delete('/:vehicleId',auth("admin"),vehicleControllers.deleteVehicles);


export const vehicleRoutes=router;