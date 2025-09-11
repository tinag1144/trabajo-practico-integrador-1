import { Router } from "express";
import { deleteUser, getUserById, listUsers, updateUserById } from "../controllers/user.controller.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { deleteUserValidation, updateUserValidation } from "../middlewares/validations/user.validations.js";

export const userRouter = Router();

userRouter.get("/users", authMiddleware, adminMiddleware, listUsers);
userRouter.get("/users/:id", authMiddleware, adminMiddleware, getUserById);
userRouter.put("/users/:id", authMiddleware, adminMiddleware, updateUserValidation, updateUserById);
userRouter.delete("/users/:id", authMiddleware, adminMiddleware, deleteUserValidation, deleteUser);