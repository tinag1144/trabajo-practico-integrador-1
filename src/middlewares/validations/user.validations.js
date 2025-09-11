import { body, param } from "express-validator";
import { userModel } from "../../models/user.model.js";

//validacion para actualizar usuario
export const updateUserValidation = [
    param("id")
        .notEmpty().withMessage("El id es obligatorio")
        .isInt().withMessage("El id debe ser un número entero")
        .custom(async (value) => {
            const user = await userModel.findByPk(value);
            if (!user) throw new Error("El usuario no existe");
        }),

    body("username")
        .optional()
        .isLength({ min: 3, max: 20 }).withMessage("Debe tener entre 3 y 20 caracteres")
        .isAlphanumeric().withMessage("Debe ser alfanumérico")
        .custom(async (value, { req }) => {
            if (!value) return;
            const user = await userModel.findOne({ where: { username: value } });
            if (user && user.id !== parseInt(req.params.id)) {
                throw new Error("El nombre de usuario ya está en uso");
            }
        }),

    body("email")
        .optional()
        .isEmail().withMessage("Formato de email inválido")
        .custom(async (value, { req }) => {
            if (!value) return;
            const user = await userModel.findOne({ where: { email: value } });
            if (user && user.id !== parseInt(req.params.id)) {
                throw new Error("El correo electrónico ya está en uso");
            }
        }),

    body("password")
        .optional()
        .isLength({ min: 8 }).withMessage("Debe tener al menos 8 caracteres")
        .matches(/[A-Z]/).withMessage("Debe contener al menos una mayúscula")
        .matches(/[a-z]/).withMessage("Debe contener al menos una minúscula")
        .matches(/\d/).withMessage("Debe contener al menos un número"),

    body("role")
        .optional()
        .isIn(["user", "admin"]).withMessage("El rol debe ser 'user' o 'admin'"),
];

//validacion para eliminar un usuario
export const deleteUserValidation = [
    param("id")
        .notEmpty().withMessage("El id es obligatorio")
        .isInt().withMessage("El id debe ser un número entero")
        .custom(async (value) => {
            const user = await userModel.findByPk(value);
            if (!user) throw new Error("El usuario no existe");
        }),
];
