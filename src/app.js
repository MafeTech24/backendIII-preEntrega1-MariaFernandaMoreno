import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import usersRouter from "./routes/users.router.js";
import petsRouter from "./routes/pets.router.js";
import adoptionsRouter from "./routes/adoption.router.js";
import sessionsRouter from "./routes/sessions.router.js";
import mocksRouter from "./routes/mocks.router.js";

// 1) Cargar variables de entorno
dotenv.config();

const app = express();

// 2) Tomar valores desde .env
const PORT = process.env.PORT || 8080;
const MONGO_URL = process.env.MONGO_URL;
const MONGO_DB_NAME = process.env.MONGO_DB_NAME || "backendIII";

// 3) Middlewares
app.use(express.json());
app.use(cookieParser());

// 4) Rutas API
app.use("/api/users", usersRouter);
app.use("/api/pets", petsRouter);
app.use("/api/adoptions", adoptionsRouter);
app.use("/api/sessions", sessionsRouter);
app.use("/api/mocks", mocksRouter);

// 5) Conexión a MongoDB y arranque del servidor
mongoose
  .connect(MONGO_URL, { dbName: MONGO_DB_NAME })
  .then(() => {
    console.log("Conectado a MongoDB");
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error al conectar a MongoDB:", error.message);
    process.exit(1);
  });
