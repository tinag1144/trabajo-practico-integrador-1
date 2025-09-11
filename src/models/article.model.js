import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";
import { tagModel } from "./tag.model.js";
import { articleTagModel } from "./articleTag.model.js";

export const articleModel = sequelize.define("Article", {
    title: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    excerpt: {
        type: DataTypes.STRING(500),
        allowNull: true,
    },
    status: {
        type: DataTypes.ENUM( "published", "archived" ),
        defaultValue: "published",
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: "Users", 
            key: "id",
        }
    },
    
}, {
    tablename: "Articles",   
    timestamps: true,
}); 

//RELACION MUCHOS A MUCHOS 
articleModel.belongsToMany(tagModel, {
    through: articleTagModel,
    foreignKey: "article_id",
    as: "tags",
    onDelete: "CASCADE"
});

tagModel.belongsToMany(articleModel, {
    through: articleTagModel,
    foreignKey: "tag_id",
    as: "articles"
});