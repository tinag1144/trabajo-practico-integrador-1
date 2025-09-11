import { articleModel } from "../models/article.model.js";
import { userModel } from "../models/user.model.js";

//controlador para crear un article
export const createArticle = async (req, res) => {
    const { title, content, excerpt, status, user_id } = req.body;
    try {
        const newArticle = await articleModel.create({
            title,
            content,
            excerpt,
            status,
            user_id
        });
        res.status(201).json({ message: "Artículo creado con éxito"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear el artículo"});
    }
};

//controlador para obtener todos los articles
export const getAllArticles = async (req, res) => {
    try {
        const articles = await articleModel.findAll()
        res.status(200).json(articles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener los artículos"});
    }   
};

//controlador para obtener un article por id        
export const getArticleById = async (req, res) => {
    const { id } = req.params;      
    try {
        const article = await articleModel.findByPk(id);
        return res.status(200).json(article);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener el artículo"});
    }
};

//cotrolador para listar los articles del usuario logueado
export const getArticlesByUser = async (req, res) => {
    try {
         const articleUserLogin = await userModel.findByPk(req.user.id,
             {
                attributes: { exclude: ["password"] },
                include: {
                    model: articleModel,
                     as: "articles",
      },
    });
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener los artículos del usuario logueado" });
    }
};

//controlador para traer un articulo por su id del usuario logueado
export const getArticleByUserId = async (req, res) => {
    try {
        const article = await articleModel.findOne({
            where: {
                id: id,
                user_id: req.user.id,
            },
         });
         return res.status(200).json(article);
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener el artículo del usuario logueado" });
    }
};

//controlador para actualizar un article    
export const updateArticle = async (req, res) => {
    const { id } = req.params;
    const { title, content, excerpt, status } = req.body;
    try {
        const article = await articleModel.findByPk(id);
        const updatedArticle = await article.update({
            title,
            content,
            excerpt,
            status
        });
        res.status(200).json({ message: "Artículo actualizado con éxito"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar el artículo"});
    }   
};

//controlador para traer el article logeado
export const getLoggedInArticle = async (req, res) => {
    const { id } = req.user;
    try {
        const article = await articleModel.findOne({ where: { user_id: id } });
        res.status(200).json(article);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener el artículo del usuario logeado" });
    }
};


//controlador para eliminar un article
export const deleteArticle = async (req, res) => {
    const { id } = req.params;  
    try {
        const article = await articleModel.findByPk(id);
        await article.destroy();
        res.status(200).json({ message: "Artículo eliminado con éxito"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al eliminar el artículo"});
    }   
};