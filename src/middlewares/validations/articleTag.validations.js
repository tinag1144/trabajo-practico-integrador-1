import { body } from "express-validator";

export const createArticleTagValidation = [
    body("article_id")
        .notEmpty().withMessage("El article_id es obligatorio"),

    body("tag_id")
        .notEmpty().withMessage("El tag_id es obligatorio"),
];

