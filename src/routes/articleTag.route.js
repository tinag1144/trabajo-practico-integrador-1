import { Router } from "express";
import { createArticleTag, deleteArticleTag } from "../controllers/articleTag.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { ownerMiddleware } from "../middlewares/owner.middleware.js";
import { createArticleTagValidation } from "../middlewares/validations/articleTag.validations.js";

export const articleTagRouter = Router();

articleTagRouter.post("/article-tags", authMiddleware, ownerMiddleware, createArticleTagValidation, createArticleTag);
articleTagRouter.delete("/article-tags/:id", authMiddleware, ownerMiddleware, deleteArticleTag);