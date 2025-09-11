import { body, param } from "express-validator";
import { userModel } from "../../models/user.model.js";

export const createArticleValidation = [
    body("title")
        .notEmpty().withMessage("El título es obligatorio")
        .isLength({ min: 3, max: 200 }).withMessage("Debe tener entre 3 y 200 caracteres"),
    body("content")
        .notEmpty().withMessage("El contenido es obligatorio")
        .isLength({ min: 50 }).withMessage("Debe tener al menos 50 caracteres"),
    body("excerpt")
        .optional()
        .isLength({ max: 500 }).withMessage("Máximo 500 caracteres"),
    body("status")
        .notEmpty().withMessage("El estado es obligatorio")
        .isIn(["published", "archived"]).withMessage("Estado inválido"),
    body("user_id")
        .notEmpty().withMessage("El user_id es obligatorio")
        .isInt().withMessage("Debe ser un número entero")
        .custom(async (value) => {
            const user = await userModel.findByPk(value);
            if (!user) throw new Error("El usuario no existe");
        }),
];

export const updateArticleValidation = [
    param("id").isInt()
    .withMessage("El id debe ser un número entero"),
    body("title")
        .optional()
        .isLength({ min: 3, max: 200 }).withMessage("Debe tener entre 3 y 200 caracteres"),
    body("content")
        .optional()
        .isLength({ min: 50 }).withMessage("Debe tener al menos 50 caracteres"),
    body("excerpt")
        .optional()
        .isLength({ max: 500 }).withMessage("Máximo 500 caracteres"),
    body("status")
        .optional()
        .isIn(["published", "archived"]).withMessage("Estado inválido"),
];