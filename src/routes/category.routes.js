import Router from "express";
import { check } from "express-validator";
import {
  addCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../controllers/category.controller.js";
import { authenticate } from "../middlewares/auth.js";
import {
  handleValidationErrors,
  validarRolAdmin,
  validarCategoriaId,
} from "../middlewares/validators.js";

const router = Router();

router.get("/", getCategories); // traer cat
router.post(
  "/",
  [
    authenticate,
    check("nombre").notEmpty().withMessage("El nombre es obligatorio"),
    handleValidationErrors,
  ],
  addCategory,
); //crear cat
router.put(
  "/:id",
  [
    authenticate,
    validarRolAdmin,
    check("id").isMongoId().withMessage("El id debe ser válido"),
    check("nombre").notEmpty().withMessage("El nombre es obligatorio"),
    check("id").custom(validarCategoriaId),
    handleValidationErrors,
  ],
  updateCategory,
); // actualizar cat
router.delete(
  "/:id",
  [
    authenticate,
    validarRolAdmin,
    check("id").isMongoId().withMessage("El id debe ser válido"),
    check("id").custom(validarCategoriaId),
    handleValidationErrors,
  ],
  deleteCategory,
); //inactivar cat

export default router;
