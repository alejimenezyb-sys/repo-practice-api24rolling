import Router from "express";
import {
  addCategory,
  getCategories,
  updateCategory,
} from "../controllers/category.controller.js";
import { authenticate } from "../middlewares/auth.js";

const router = Router();

router.get("/", getCategories); // traer cat
router.post("/", authenticate, addCategory); //crear cat
router.put("/:id", authenticate, updateCategory); // actualizar cat
router.delete("/:id", () => {}); //inactivar cat

export default router;
