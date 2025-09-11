import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { getProfile, updateProfile } from "../controllers/profile.controller.js";
import { updateProfileValidation } from "../middlewares/validations/profile.validations.js";


export const profileRouter = Router();


profileRouter.get("/profile", authMiddleware, getProfile );
profileRouter.put("/profile", authMiddleware, updateProfileValidation, updateProfile );