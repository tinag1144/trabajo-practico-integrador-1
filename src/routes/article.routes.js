import { Router } from "express";
import { 
    createArticle, 
    getAllArticles, 
    getArticleById, 
    updateArticle, 
    deleteArticle, 
    getArticlesByUserLogged,
    getArticleByUserId} from "../controllers/article.controller.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { createArticleValidation, updateArticleValidation } from "../middlewares/validations/article.validations.js";

export const articleRouter = Router();

//RUTAS PARA ARTICLES
articleRouter.post("/articles", authMiddleware, createArticleValidation, createArticle); 
articleRouter.get("/articles", authMiddleware, getAllArticles); 
articleRouter.get("/articles/user", authMiddleware, getArticlesByUserLogged);
articleRouter.get("/articles/:id", authMiddleware, getArticleById); 
articleRouter.get("/articles/user/:id", authMiddleware, getArticleByUserId);
articleRouter.put("/articles/:id", authMiddleware, adminMiddleware, updateArticleValidation, updateArticle); 
articleRouter.delete("/articles/:id", authMiddleware, adminMiddleware, deleteArticle);