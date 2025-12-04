import express from "express"
import { vehicleControllers } from "./vehicle.controllers";

const router= express.Router();

router.post('/',vehicleControllers.createVehicle);
router.get('/',vehicleControllers.getVehicles);
router.get('/:id',vehicleControllers.getSingleVehicles);
router.put('/:id',vehicleControllers.updateVehicles);
router.delete('/:id',vehicleControllers.deleteVehicles);


export const vehicleRoutes=router;