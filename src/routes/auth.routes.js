import { Router } from "express";
import User from "../models/User.js";
import {
  getProfile,
  getUsers,
  login,
  logOut,
  register,
  updatePassword,
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
router.get("/profile", authenticate, getProfile);

//actualizar contraseña
router.put(
  "/password",
  loginValidation(),
  validationPassword(),
  handleValidationErrors,
  updatePassword,
);

//reenviar código de verificación

export default router;
