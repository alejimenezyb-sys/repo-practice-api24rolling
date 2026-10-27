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
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) {
        throw new Error("El email ya existe");
      }
    })
    .normalizeEmail(),

  //validar password
  // check("password")
  //   .isLength({ min: 6, max: 30 })
  //   .withMessage("La contraseña debe tener como mínimo 6 caracteres")
  //   .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)
  //   .withMessage(
  //     "La contraseña debe tener al menos 8 caracteres, una letra y un número",
  //   ),
  // handleValidationErrors,
];

//Validar login
export const loginValidation = () => [
  check("email")
    .trim()
    .isEmail()
    .withMessage("Ingresá un email válido")
    .normalizeEmail(),
  check("password").notEmpty().withMessage("La contraseña es requerida"),
  // handleValidationErrors,
];

export const validationPassword = () => [
  check("password")
    .isLength({ min: 8, max: 30 })
    .withMessage("La contraseña debe tener como mínimo 6 caracteres")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    .withMessage(
      "La contraseña debe tener al menos 8 caracteres, una letra y un número",
      // handleValidationErrors,
    ),
];
//validar código email
