import { registerUser, login, getProfile, logout } from "../controllers/auth.controllers.js";
import { Router } from "express";
import { validarRegistro } from "../middlewares/validations/auth.validations.js";
import { validator } from "../middlewares/validator.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

export const authRouter = Router();


authRouter.post("/register", validarRegistro, validator, registerUser);
authRouter.post("/login", login);
authRouter.get("/profile", authMiddleware, getProfile );
authRouter.post("/logout", logout);