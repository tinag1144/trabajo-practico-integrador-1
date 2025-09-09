import { registerUser } from "../controllers/auth.controllers.js";
import { Router } from "express";
import { validarRegistro } from "../middlewares/validations/auth.validations.js";
import { validator } from "../middlewares/validator.js";

export const authRouter = Router();


authRouter.post("/register", validarRegistro, validator, registerUser);
