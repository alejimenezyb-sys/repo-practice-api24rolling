import Router from "express";

const router = Router();

router.get("/"); // traer cat
router.post("/"); //crear cat
router.put("/:id"); // actualizar cat
router.delete("/:id"); //inactivar cat

export default router;
