import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { getProfile, updateProfile } from "../controllers/profile.controllers.js";


export const profileRouter = Router();


profileRouter.get("/profile", authMiddleware, getProfile );
profileRouter.put("/profile", authMiddleware, updateProfile );