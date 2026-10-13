import User from "../models/User.js";
import { verifyToken } from "../utils/jwt.js";

export const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        ok: false,
        message: "La autenticación es requerida",
      });
    }

    const decoded = verifyToken(token);

    //buscar usuario asociado al token que ya pasó por la verificación

    const user = await User.findById(decoded.userId).select("-password");

    //validar si existe el user
    if (!user) {
      return res.status(401).json({
        ok: false,
        message: "Usuario no encontrado",
      });
    }

    //guardar los datos del usuario
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
};
