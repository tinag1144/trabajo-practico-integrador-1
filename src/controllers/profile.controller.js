import { profileModel } from "../models/profile.model.js";
import { userModel } from "../models/user.model.js";

// Controlador para obtener el perfil del usuario autenticado
export const getProfile = async (req, res) => {
    const userId = req.user.id; 
    try {
        const user = await userModel.findByPk(userId, {
            attributes: { exclude: ["password"] }, 
            include: [{ 
                model: profileModel,
                as: "profile" }],
       });
       if (!user) {
           return res.status(404).json({ message: "Usuario no encontrado" });
       }
       return res.status(200).json(user);
    } catch (error) {
        console.error("Error al obtener perfil:", error);
        return res.status(500).json({ message: "Error del servidor" });
    }
};

// Controlador para actualizar el perfil del usuario autenticado

export const updateProfile = async (req, res) => {
    const userId = req.user.id;
    const { first_name, last_name, biography, avatar_url, birth_date } = req.body;
    try {
        const profile = await profileModel.findOne({ where: { user_id: userId } });
        if (!profile) {
            return res.status(404).json({ message: "Perfil no encontrado" });
        };
        await profile.update({
             first_name, 
             last_name, 
             biography, 
             avatar_url, 
             birth_date 
            });
        return res.status(200).json({ message: "Perfil actualizado con éxito" });

    } catch (error) {
        console.error("Error al actualizar perfil:", error);
        return res.status(500).json({ message: "Error del servidor" });
    }
}