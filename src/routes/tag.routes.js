import { Router } from "express";
import { 
    createTag, 
    getTag, 
    getTagAndArticles, 
    updateTag, 
    deleteTag } from "../controllers/tags.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";

export const tagRouter = Router();

tagRouter.post("/tags", authMiddleware, adminMiddleware, createTag);
tagRouter.get("/tags", authMiddleware, getTag);
tagRouter.get("/tags/:id", authMiddleware, adminMiddleware, getTagAndArticles);
tagRouter.put("/tags/:id", authMiddleware, adminMiddleware, updateTag);
tagRouter.delete("/tags/:id", authMiddleware, adminMiddleware, deleteTag);