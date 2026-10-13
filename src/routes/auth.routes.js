import { Router } from "express";
import User from "../models/User.js";
import {
  getUsers,
  login,
  register,
  verifyEmail,
} from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/auth.js";
import { registerValidation } from "../middlewares/validators.js";

const router = Router();

router.get("/", authenticate, getUsers);
router.post("/register", registerValidation(), register);
router.post("/login", login);
router.post("/verify-email", verifyEmail);

export default router;
