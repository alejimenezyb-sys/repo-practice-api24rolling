import { Router } from "express";
import User from "../models/User.js";

const router = Router();

router.get("/", async (req, res) => {
  const users = await User.find();

  res.json({
    msg: "Todo bien",
    users,
  });
});

router.post("/", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({
      username,
      email,
      password,
    });

    //Generar el código de verificación

    //Guardar el usuario

    await user.save();

    //mandar respuesta

    return res.status(200).json({
      ok: true,
      msg: "Usuario creado! ",
    });
  } catch (error) {}
});

export default router;
