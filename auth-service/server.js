import express from "express";
import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";

import { initDb } from "./database/database.js";

import pageRouter from "./routers/pages.js";
import apiRouter from "./routers/api.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.AUTH_PORT  || 3000;

await initDb();

//midlleware - промежуточные слои
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));

//routers - обработчики запросов
app.use("/", pageRouter);
app.use("/api", apiRouter);

// запуск
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});