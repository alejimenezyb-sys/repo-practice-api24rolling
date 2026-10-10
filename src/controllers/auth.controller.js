import User from "../models/User.js";

const getUsers = async (req, res) => {
  const users = await User.find();

  res.json({
    msg: "Todo bien",
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

    //Guardar el usuario

    await user.save();

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
export { getUsers, register };
