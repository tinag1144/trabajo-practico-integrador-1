import { body } from "express-validator";
import { userModel } from "../../models/user.model.js";

//Validaciones para el registro de usuario
export const validarRegistro = [

    //Validaciones para userModel
    body("username")
        .notEmpty().withMessage("El nombre de usuario es obligatorio")
        .isLength({ min: 3, max: 20 }).withMessage("El nombre de usuario debe tener entre 3 y 20 caracteres")
        .custom(async (value) => {
            const user = await userModel.findOne({ where: { username: value } });
            if (user) {
                throw new Error("El nombre de usuario ya está en uso");
                
            } 
        }),

    body("email")
        .notEmpty().withMessage("El correo electrónico es obligatorio")
        .isEmail().withMessage("El correo electrónico no es válido")
        .custom(async (value) => {
            const user = await userModel.findOne({ where: { email: value } });      
            if (user) {
                throw new Error("El correo electrónico ya está en uso");
            }
        }),

    body("password")    
        .notEmpty().withMessage("La contraseña es obligatoria")
        .isLength({ min: 8 }).withMessage("La contraseña debe tener al menos 8 caracteres")
        .matches(/[A-Z]/).withMessage("Debe contener al menos una letra mayúscula")
        .matches(/[a-z]/).withMessage("Debe contener al menos una letra minúscula")
        .matches(/\d/).withMessage("Debe contener al menos un número"),

    body("role")
        .notEmpty().withMessage("El rol es obligatorio")
        .isIn(["user", "admin"]).withMessage("El rol debe ser 'user' o 'admin'"),

    //Validaciones para profileModel
    body("first_name")
        .notEmpty().withMessage("El nombre es obligatorio")
        .isLength({min: 2, max: 50 }).withMessage("El nombre debe tener entre 2 y 50 caracteres")
        .isAlpha("es-ES", { ignore: " " }).withMessage("El nombre solo debe contener letras"),

    body("last_name")
        .notEmpty().withMessage("El apellido es obligatorio")
        .isLength({min: 2, max: 255 }).withMessage("El apellido debe tener entre 2 y 255 caracteres")
        .isAlpha("es-ES", { ignore: " " }).withMessage("El apellido solo debe contener letras"),
    
    body("biography")
        .optional()
        .isLength({ max: 500 }).withMessage("La biografía no debe exceder los 500 caracteres"),
    
    body("avatar_url")
        .optional()
        .isURL().withMessage("La URL del avatar no es válida"),
    body("birth_date")
        .optional()
        .isDate().withMessage("La fecha de nacimiento no es válida"),
];