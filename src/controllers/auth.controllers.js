import { userModel } from "../models/user.model.js";
import { profileModel } from "../models/profile.model.js";
import { hashPassword } from "../helpers/bcrypt.helper.js";

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