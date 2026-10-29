import { Router } from "express";
import User from "../models/User.js";
import {
  getUsers,
  login,
  logOut,
  register,
  verifyEmail,
} from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/auth.js";
import {
  handleValidationErrors,
  loginValidation,
  registerValidation,
  validationPassword,
  verifyEmailValidation,
} from "../middlewares/validators.js";

const router = Router();
//rutas públicas
router.post(
  "/register",
  registerValidation(),
  validationPassword(),
  handleValidationErrors,
  register,
);
router.post(
  "/login",
  loginValidation(),
  validationPassword(),
  handleValidationErrors,
  login,
);
router.post("/verify-email", verifyEmailValidation(), verifyEmail);
//rutas protegidas
router.get("/", authenticate, getUsers);
router.post("/logout", authenticate, logOut);
router.get("/profile", authenticate, () => {});
export default router;
