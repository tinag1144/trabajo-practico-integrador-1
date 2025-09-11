import { Router } from "express";
import { 
    createTag, 
    getTag, 
    getTagAndArticles, 
    updateTag, 
    deleteTag, } from "../controllers/tags.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import { createTagVlidation, updateTagValidator } from "../middlewares/validations/tag.validations.js";

export const tagRouter = Router();

tagRouter.post("/tags", authMiddleware, adminMiddleware, createTagVlidation, createTag);
tagRouter.get("/tags", authMiddleware, getTag);
tagRouter.put("/tags/:id", authMiddleware, adminMiddleware, updateTagValidator, updateTag);
tagRouter.get("/tags/:id", authMiddleware, adminMiddleware, getTagAndArticles);
tagRouter.delete("/tags/:id", authMiddleware, adminMiddleware, deleteTag);