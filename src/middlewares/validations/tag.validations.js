import { body, param } from "express-validator";

export const createTagVlidation = [
    body("name")
        .notEmpty().withMessage("El nombre es obligatorio")
        .isLength({ min: 2, max: 30 }).withMessage("Debe tener entre 2 y 30 caracteres")
        .isAlphanumeric().withMessage("Debe ser alfanumérico, sin espacios")
        .custom(async (value) => {
            const tag = await tagModel.findOne({ where: { name: value } });
            if (tag) throw new Error("La etiqueta ya existe");
        }),
];

export const updateTagValidator = [
    param("id").isInt().withMessage("El id debe ser un número entero"),
    body("name")
        .optional()
        .isLength({ min: 2, max: 30 }).withMessage("Debe tener entre 2 y 30 caracteres")
        .isAlphanumeric().withMessage("Debe ser alfanumérico, sin espacios")    
        .custom(async (value) => {
            const tag = await tagModel.findOne({ where: { name: value } });
            if (tag) throw new Error("La etiqueta ya existe");
        })
];
