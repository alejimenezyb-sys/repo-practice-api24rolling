import express from "express";
import cors from "cors";
import { dbConnect } from "./src/config/database.js";
import authRouter from "./src/routes/auth.routes.js";
import cookieParser from "cookie-parser";
import categoryRoutes from "./src/routes/category.routes.js";
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/category", categoryRoutes);
await dbConnect();

app.listen(PORT, () => console.log(`✅ Server online en puerto ${PORT}`));
