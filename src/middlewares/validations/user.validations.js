import { body } from 'express-validator';


//validaciones para actualizar un user
export const updateUserValidations = [
    body("username")
        .optional()
        .isLength({ min: 3, max: 30 })
        .withMessage("El nombre de usuario debe tener entre 3 y 30 caracteres."),
]