import { validationResult, check } from "express-validator";
import User from "../models/User.js";
export const handleValidationErrors = (req, res, next) => {
  //preguntar si hay errores
  const errors = validationResult(req);
  //si está vacío, si no está vacío mostrar un 400
  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.mapped(),
    });
  }
  //si no hay errores, next
  next();
};

//validar registro
export const registerValidation = () => [
  check("username")
    .notEmpty()
    .withMessage("El nombre de usuario no puede estar vacío")
    .custom(async (value) => {
      const user = await User.findOne({ username: value });
      if (user) {
        throw new Error("El usuario ya existe");
      }
    }),
  //validación email
  check("email")
    .isEmail()
    .withMessage("Ingresá un email válido")
    .normalizeEmail({ gmail_remove_dots: false })
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) {
        throw new Error("El email ya existe");
      }
    }),
];

//Validar login
export const loginValidation = () => [
  check("email")
    .trim()
    .isEmail()
    .withMessage("Ingresá un email válido")
    .normalizeEmail({ gmail_remove_dots: false }),
];

export const validationPassword = () => [
  check("password")
    .notEmpty()
    .withMessage("La contraseña es requerida")
    .isLength({ min: 8, max: 30 })
    .withMessage("La contraseña debe tener como mínimo 6 caracteres")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    .withMessage(
      "La contraseña debe tener al menos 8 caracteres, una letra y un número",
    ),
];
//validar código email
export const verifyEmailValidation = () => [
  check("code")
    .notEmpty()
    .withMessage("El código de verificación es necesario")
    .trim()
    .isNumeric()
    .withMessage("El código debe ser un número")
    .isLength({ min: 6, max: 6 })
    .withMessage("El código debe tener 6 dígitos"),
  check("email")
    .notEmpty()
    .withMessage("El correo es requerido")
    .trim()
    .isEmail()
    .withMessage("Ingresá un email válido")
    .normalizeEmail({ gmail_remove_dots: false })
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user.emailVerified) {
        throw new Error("El email ya está verificado");
      }
    }),
  handleValidationErrors,
];

//validar rol admin

export const validarRolAdmin = (req, res, next) => {
  const rol = req.user.role;

  if (rol !== "admin") {
    return res.status(401).json({
      ok: false,
      message: "No está autorizado para esta acción",
    });
  }
  next();
};
