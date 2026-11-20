import { Router } from "express";
import { check } from "express-validator";
import { authenticate } from "../middlewares/auth.js";
import {
  handleValidationErrors,
  validarProductoId,
} from "../middlewares/validators.js";
import { addItem, getItems } from "../controllers/cart.controller.js";

const router = Router();

router.get("/", authenticate, getItems);
router.post(
  "/",
  [
    authenticate,
    check("productoId").custom(validarProductoId),
    check("cantidad")
      .notEmpty()
      .withMessage("La cantidad no puede estar vacia")
      .isInt({ min: 1 }),
    handleValidationErrors,
  ],
  addItem,
);
router.put(
  "/:productId",
  [
    authenticate,
    check("productId").isMongoId().withMessage("Debe se run id válido"),
  ],
  handleValidationErrors,
  () => {},
);
router.delete("/:productId", authenticate, () => {});

export default router;
