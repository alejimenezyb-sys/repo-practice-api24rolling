import { Router } from "express";
import { check } from "express-validator";
import {
  actualizarProducto,
  borrarProducto,
  crearProducto,
  obtenerProductos,
} from "../controllers/product.controller.js";
import { authenticate } from "../middlewares/auth.js";
import {
  handleValidationErrors,
  validarRolAdmin,
} from "../middlewares/validators.js";

const router = Router();

router.get("/", obtenerProductos);
router.post(
  "/",
  [
    authenticate,
    validarRolAdmin,
    check("nombre", "El nombre es obligatorio").notEmpty(),
    check("categoria")
      .notEmpty()
      .withMessage("La categoria es obligatoria")
      .isMongoId()
      .withMessage("No es un id de Mongo válido"),
  ],
  handleValidationErrors,
  crearProducto,
);
router.put("/:id", [], actualizarProducto);
router.delete("/:id", [], borrarProducto);

export default router;
