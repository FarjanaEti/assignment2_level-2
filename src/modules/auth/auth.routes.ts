import express from "express"
import { authController } from "./auth.controllers";
const router= express.Router();

router.post('/signup', authController.signupUser);
router.post('/signin', authController.signinUser);


export const authRoutes=router;