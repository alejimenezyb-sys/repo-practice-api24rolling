import Categoria from "../models/category.js";

const getCategories = async (req, res) => {
  const categorias = await Categoria.find({ estado: true }).populate(
    "usuario",
    "username email role",
  );
  const totalCategorias = await Categoria.countDocuments({ estado: true });

  return res.status(200).json({
    ok: true,
    totalCategorias,
    categorias,
  });
};
//post
const addCategory = async (req, res) => {
  try {
    const nombre = req.body.nombre.toUpperCase();

    const validarNombreCategoria = await Categoria.findOne({ nombre });

    if (validarNombreCategoria) {
      return res.status(400).json({
        ok: false,
        message: `La categoria ${nombre} ya existe`,
      });
    }
    const usuario = req.user._id;

    const categoria = new Categoria({ nombre, usuario });
    await categoria.save();

    return res.status(201).json({
      ok: true,
      message: "Categoría guardada",
      categoria,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: error.message,
    });
  }
};
//put
const updateCategory = async (req, res) => {
  const { id } = req.params;
  const nombre = req.body.nombre.toUpperCase();

  const existeCategoria = await Categoria.findById(id);

  if (!existeCategoria) {
    return res.status(400).json({
      ok: false,
      message: `El id ${id} No existe`,
    });
  }
  const validarNombreCategoria = await Categoria.findOne({ nombre });

  if (validarNombreCategoria) {
    return res.status(400).json({
      ok: false,
      message: `Ya existe una categoria ${nombre}`,
    });
  }
  //si estado en false, x categoria no está activa
  if (!existeCategoria.estado) {
    return res.status(400).json({
      ok: false,
      message: `La categoria ${id} No está activa`,
    });
  }

  const datos = {
    nombre,
    usuario: req.user._id,
  };

  const categoria = await Categoria.findByIdAndUpdate(id, datos, {
    returnDocument: "after",
  });

  res.status(200).json({
    ok: true,
    message: "Categoria actualizada con éxito!",
    categoria,
  });
};
//delete

export { getCategories, addCategory, updateCategory };
