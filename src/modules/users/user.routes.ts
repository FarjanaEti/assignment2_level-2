import express from "express"
import { userCollectors } from "./user.controllers";
const router= express.Router();

router.post('/',userCollectors.createUser);
router.get('/',userCollectors.getUser)

export const userRoutes=router;