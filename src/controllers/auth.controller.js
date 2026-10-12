import User from "../models/User.js";
import { sendVerificationEmail } from "../config/nodemailer.js";
const getUsers = async (req, res) => {
  const users = await User.find();

  res.json({
    ok: true,
    users,
  });
};

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({
      username,
      email,
      password,
    });

    //Generar el código de verificación
    const verificationCode = user.generateVerificationCode();
    console.log(verificationCode);
    //Guardar el usuario

    await user.save();

    //enviar mail de verificación
    await sendVerificationEmail(email, username, verificationCode);
    //mandar respuesta

    return res.status(201).json({
      ok: true,
      msg: "Usuario creado! ",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        ok: false,
        message: "Credenciales incorrectas",
      });
    }

    //chequear que el password coincida
    const isPasswordValid = user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(403).json({
        ok: false,
        message: "Credenciales incorrectas",
      });
    }
    //verificar si tiene el código verificado, del emailVerified es true

    if (!user.emailVerified) {
      return res.status(403).json({
        ok: false,
        message: "El email no está verificado",
      });
    }

    //generar el token de verificación
    //Guardar token en cookies

    //Iniciar sesión
    return res.status(200).json({
      ok: true,
      message: "Login exitoso!",
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: error.message,
    });
  }
};

// Verificar el código de email

const verifyEmail = async (req, res) => {
  try {
    const { code, email } = req.body;

    const user = await User.findOne({ email });

    //verifico si user existe
    if (!user) {
      return res.status(404).json({
        ok: false,
        message: "Usuario no encontrado",
      });
    }
    //verifico el código
    if (user.verificationCode !== code) {
      return res.status(400).json({
        ok: false,
        message: "Código de verificación incorrecto",
      });
    }

    //verificar si el código expiró

    if (user.verificationCodeExpires < Date.now()) {
      return res.status(400).json({
        ok: false,
        message: "El código de verificación ya expiró",
      });
    }

    //marcar mail como verificado
    user.emailVerified = true;
    user.verificationCode = null;
    user.verificationCodeExpires = null;

    //guardar los cambios
    await user.save();

    //devolver mensaje ok

    return res.status(200).json({
      ok: true,
      message: "Email verificado correctamente",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
};

export { getUsers, register, login, verifyEmail };
