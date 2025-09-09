import express from "express";
import "dotenv/config";
import { startDb } from "./src/config/database.js";


const PORT = process.env.PORT;
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hola desde el server :p");
});

app.listen(PORT, async () => {
    await startDb();
    console.log(`Server corriendo en: http://localhost:${PORT}`);
});
