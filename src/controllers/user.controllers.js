import { userModel } from "../models/user.model.js";
import { profileModel } from "../models/profile.model.js";
import { articleModel } from "../models/article.model.js";

//controlador para listar todos los usuarios con sus perfiles
export const listUsers = async (req, res) => {
    const userId = req.user.id;
    try { 
        const users = await userModel.findAll({
            attributes: { exclude: ["password"] }, 
            include: [{     
                model: profileModel,
                as: "profile" }],
       });

       return res.status(200).json(users);
    } catch (error) {
        console.error("Error al listar usuarios");
        return res.status(500).json({ message: "Error del servidor" , error});
    }
};

//controlador para listar un usuario por su id con su perfil
export const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await userModel.findByPk(id, {
            attributes: { exclude: ["password"] },
            include: [{
                model: profileModel,
                as: "profile"} ,
                {
                model: articleModel,
                as: "articles"
                }],
                
        });

        if (user) {
            return res.status(200).json(user);
        } else {
            return res.status(404).json({ message: "Usuario no encontrado" });  
        }
    } catch (error) {
        console.error("Error al obtener usuario por ID", error);
        return res.status(500).json({ message: "Error del servidor", error });
    }   
};

//controlador para actualizar un usuario por su id
export const updateUserById = async (req, res) => {
    const { id } = req.params;
    const { username, email } = req.body;
    try {
        const user = await userModel.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }; 

        const newUser = await user.update({ username, email });

        return res.status(200).json({ message: "Usuario actualizado" }); 

    } catch (error) {
        console.error("Error al actualizar usuario por ID");
        return res.status(500).json({ message: "Error del servidor: " , error });
    }
};

//controlador para eliminar un usuario por su id
export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try{
        const user = await userModel.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });  
        };
        await user.destroy();
        return res.status(200).json({ message: "Usuario eliminado" });
    } catch (error) {
        console.error("Error al eliminar usuario por ID");
        return res.status(500).json({ message: "Error del servidor: " , error });
    }
};