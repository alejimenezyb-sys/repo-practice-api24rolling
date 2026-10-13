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
  handleValidationErrors,
];
