import express from "express";
import cors from "cors";
import { dbConnect } from "./src/config/database.js";
import authRouter from "./src/routes/auth.routes.js";
import cookieParser from "cookie-parser";
const app = express();
const PORT = 5500;

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api/auth", authRouter);

await dbConnect();

app.listen(PORT, () => console.log(`✅ Server online en puerto ${PORT}`));
