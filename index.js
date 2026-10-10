import express from "express";
import cors from "cors";
import { dbConnect } from "./src/config/database.js";

const app = express();
const PORT = 5500;

app.use(express.json());
app.use(cors());

app.get("/api/auth");

await dbConnect();

app.listen(PORT, () => console.log(`Server online en puerto ${PORT}`));
