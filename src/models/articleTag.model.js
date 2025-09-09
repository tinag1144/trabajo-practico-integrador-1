import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";  

export const articleTagModel = sequelize.define("ArticleTag", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
    },
    article_id: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false,
        references:{
            model: "Articles", 
            key: "id",
        }
    },
    tag_id: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false,
        references:{
            model: "Tags", 
            key: "id",
        }
    },
    
}, {
    tableName: "ArticleTags",
    timestamps: true,
}); 

