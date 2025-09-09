import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";
import { articleModel } from "./article.model.js";
import { profileModel } from "./profile.model.js";

export const userModel = sequelize.define("User", {
    username: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM("user", "admin"),
        defaultValue: "user",
        allowNull: false,
    },
    
}, {
    tableName: "Users",
    timestamps: true,
    paranoid: true,
}); 

//RELACIÓN UNO A UNO CON PROFILE 
userModel.hasOne(profileModel, {
    foreignKey: "user_id",
    as: "profile"
});

profileModel.belongsTo(userModel, {
    foreignKey: "user_id",
    as: "user"
});

//RELACIÓN UNO A MUCHOS CON ARTICLES

userModel.hasMany(articleModel,{
    foreignKey: "user_id",
    as:"articles"
});

articleModel.belongsTo(userModel,{
    foreignKey: "user_id",
    as: "author"
});