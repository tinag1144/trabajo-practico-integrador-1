import { tagModel } from "../models/tag.model.js"
import { articleModel } from "../models/article.model.js";

//controlador para crear etiquetas
export const createTag = async (req, res) => {
    try {
        const { name } = req.body; 
        const tag = await tagModel.create({ name });
        res.status(201).json({ message: "Etiqueta creada exitosamente"});
    } catch (error) {
        res.status(500).json({ message: "Error del servidor", error: error.message });
    }
}; 

//controlador para obtener todas las etiquetas
export const getTag = async (req, res) => {
    try {
        const tags = await tagModel.findAll() 
        res.status(200).json(tags);
    } catch (error) {
        return res.status(500).json({ message: "Error del servidor", error: error.message });
    }
};

//controlador para obtener todas las etiquetas con sus articulos 
export const getTagAndArticles = async (req, res) => {
    try {
        const tag = await tagModel.findByPk(id, {
            include: {
                model: articleModel,
                as: "articles"
            }
        });
        res.status(200).json(tag);
    } catch (error) {
        return res.status(500).json({ message: "Error del servidor", error: error.message });
    }
}; 

//controlador para actualizar una etiqueta 
export const updateTag = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const tag = await tagModel.findByPk(id);
        const newTag = await tag.update({ name });
        res.status(200).json({ message: "Etiqueta actualizada exitosamente" });
    } catch (error) {       
        return res.status(500).json({ message: "Error del servidor", error: error.message });
    }
};

//controlaodr para eliminar una etiqueta
export const deleteTag = async (req, res) => {
    const { id } = req.params;
    try {
        const tag = tagmodel.findByPk(id);
        await tag.destroy();
        res.status(200).json({ message: "Etiqueta eliminada exitosamente" });
    } catch (error) {
        return res.status(500).json({ message: "Error del servidor", error: error.message });
    }
};