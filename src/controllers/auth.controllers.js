import { userModel } from "../models/user.model.js";
import { profileModel } from "../models/profile.model.js";
import { comparePassword, hashPassword } from "../helpers/bcrypt.helper.js";
import { generateToken } from "../helpers/jwt.helper.js";

// Controlador para registrar un nuevo usuario y crear su perfil asociado
export const registerUser = async (req, res) => {
    try {
        const { username, email, password, role, first_name, last_name, biography, avatar_url, birth_date } = req.body;
        const hashedPassword = await hashPassword(password);

        // Crear el usuario
        const newUser = await userModel.create({
            username,
            email,
            password: hashedPassword,
            role,
        });
        // Crear el perfil asociado al usuario
        const newProfile = await profileModel.create({
            user_id: newUser.id,
            first_name,
            last_name,
            biography,
            avatar_url,
            birth_date,
        });
        res.status(201).json({ message: "Usuario registrado con éxito" });

    } catch (error) {
        console.error("Error al registrar usuario:", error);
        res.status(500).json({ message: "Error del servidor" });
    }
};

// Controlador para el inicio de sesión de usuario
export const login = async (req, res) => {
    const { username, password } = req.body;
    try { 
        //buscar usuario por username
        const user = await userModel.findOne({ where: { username },
            include: [{ 
                model: profileModel,
                as: "profile" }],
       });
       //Validar contraseña hasheada
    const hashPass = await comparePassword(password, user.password);

    if (!user) {
        return res.status(401).json({ message: "Credenciales inválidas" });
     };
    if (!hashPass) {
        return res.status(401).json({ message: "Credenciales inválidas" });
    };


     //Generar token
    const token = generateToken({
        id: user.id,
        username: user.username,
        role: user.role,
    });

    //Guardar token en cookies
    res.cookie("token", token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000, // 1 hora
    });

    return res.status(200).json({ message: "Inicio de sesión exitoso" });
} catch (error) {
    return res.status(500).json({ message: "Error del servidor" + error})
}};


// Controlador para el cierre de sesión de usuario
export const logout = (req, res) => {
    res.clearCookie("token");
    return res.status(200).json({ message: "Cierre de sesión exitoso" });
};