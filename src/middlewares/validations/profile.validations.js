import { body, param } from 'express-validator';
import { profileModel } from '../../models/profile.model.js';

// Validación para actualizar el perfil
export const updateProfileValidation = [
    body("first_name")
        .notEmpty().withMessage("El nombre es obligatorio")
        .isLength({ min: 2, max: 50 }).withMessage("Debe tener entre 2 y 50 caracteres")
        .isAlpha("es-ES", { ignore: " " }).withMessage("Debe contener solo letras"),

    body("last_name")
        .notEmpty().withMessage("El apellido es obligatorio")
        .isLength({ min: 2, max: 50 }).withMessage("Debe tener entre 2 y 50 caracteres")
        .isAlpha("es-ES", { ignore: " " }).withMessage("Debe contener solo letras"),

    body("biography")
        .optional()
        .isLength({ max: 500 }).withMessage("Máximo 500 caracteres"),

    body("avatar_url")
        .optional()
        .isURL().withMessage("Debe ser una URL válida"),
    body("birth_date")
        .optional()
        .isISO8601().withMessage("Debe ser una fecha válida"), 
        
    param("id").isInt().withMessage("El id debe ser un número entero"),
];