import { Router } from "express";
import User from "../models/User.js";
import {
  getUsers,
  login,
  register,
  verifyEmail,
} from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/auth.js";

const router = Router();

router.get("/", authenticate, getUsers);
router.post("/register", register);
router.post("/login", login);
router.post("/verify-email", verifyEmail);

export default router;
