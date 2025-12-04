import express from "express"
import { userCollectors } from "./user.controllers";
const router= express.Router();

router.post('/',userCollectors.createUser);
router.get('/',userCollectors.getUser)
router.get('/:id',userCollectors.getSingleUser)
router.put('/:id',userCollectors.updateUser)

export const userRoutes=router;