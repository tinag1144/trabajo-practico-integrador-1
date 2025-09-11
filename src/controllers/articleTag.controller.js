import { articleTagModel } from "../models/articleTag.model.js";
import { articleModel } from "../models/article.model.js";
import { tagModel } from "../models/tag.model.js";

// conroladores para crear 
export const createArticleTag = async (req, res) => {
    try {
        const { article_id, tag_id } = req.body;

        //Primero verificar qe existan 
        const article = await articleModel.findByPk(article_id);
        const tag = await tagModel.findByPk(tag_id);

        if (!article) return res.status(404).json({ message: "Artículo no encontrado" });
        if (!tag) return res.status(404).json({ message: "Tag no encontrado" });

        //verificar si YA existe una relacion entre los ids ingresados
        const exists = await articleTagModel.findOne({ where: { article_id, tag_id } });
        if (exists) return res.status(400).json({ message: "El tag ya está asociado a este artículo" });

        //y ahora si, se crea la relacion
        const articleTag = await articleTagModel.create({ article_id, tag_id });
        return res.status(201).json(articleTag);

    } catch (error) {
        console.error("Error al crear ArticleTag:", error);
        return res.status(500).json({ message: "Error del servidor" });
    }
};

// controlador para eliminar 
export const deleteArticleTag = async (req, res) => {
    try {
        const { id } = req.params;
        const articleTag = await articleTagModel.findByPk(id);

        if (!articleTag) return res.status(404).json({ message: "Relación no encontrada" });

        await articleTag.destroy();
        return res.status(200).json({ message: "Relación eliminada correctamente" });
    } catch (error) {
        console.error("Error al eliminar ArticleTag:", error);
        return res.status(500).json({ message: "Error del servidor" });
    }
};


//relacion
articleModel.belongsToMany(tagModel, {
    through: articleTagModel, 
    as: "tag_id", 
    foreignKey: "article_id" });

tagModel.belongsToMany(articleModel, { 
    through: articleTagModel, 
    as: "article_id", 
    foreignKey: "tag_id" });