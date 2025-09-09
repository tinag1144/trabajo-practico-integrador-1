import express from "express";
import "dotenv/config";
import { startDb } from "./src/config/database.js";
import { userModel } from "./src/models/user.model.js";
import { profileModel } from "./src/models/profile.model.js";
import { articleModel } from "./src/models/article.model.js";
import { tagModel } from "./src/models/tag.model.js";
import { articleTagModel } from "./src/models/articleTag.model.js";
import { authRouter } from "./src/routes/auth.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";


const PORT = process.env.PORT;
const app = express();
app.use(express.json());

app.use(cors({
    origin: "http://localhost:3001",
    credentials: true,
}));
app.use(cookieParser());

//RUTAS
app.use("/api/auth", authRouter); 

app.get("/", (req, res) => {
  res.send("Hola desde el server :p");
});

app.listen(PORT, async () => {
    await startDb();
    await userModel.sync();
    await profileModel.sync();
    await articleModel.sync();
    await tagModel.sync();
    await articleTagModel.sync();
    console.log(`Server corriendo en: http://localhost:${PORT}`);
});

startDb();