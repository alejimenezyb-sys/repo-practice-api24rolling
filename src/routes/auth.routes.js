import { Router } from "express";
import User from "../models/User.js";
import { getUsers, register } from "../controllers/auth.controller.js";

const router = Router();

router.get("/", getUsers);

router.post("/", register);

export default router;
