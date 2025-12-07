import express from "express"
import { userCollectors } from "./user.controllers";
import logger from "../../middleware/logger";
import auth from "../../middleware/auth";
const router= express.Router();

router.post('/',userCollectors.createUser);
router.get('/',logger,auth("admin"),userCollectors.getUser)
router.get('/:userId',userCollectors.getSingleUser)
router.put('/:userId',auth("admin","customer"),userCollectors.updateUser)
router.delete('/:userId',auth("admin"),userCollectors.deleteUser)

export const userRoutes=router;