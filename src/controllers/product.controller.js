import Producto from "../models/Product.js";

const obtenerProductos = async () => {
  //paginación

  try {
    const { limite = 5, desde = 0 } = req.query;

    const [total, productos] = await Promise.all([
      Producto.countDocuments({ estado: true }),
      Producto.find({ estado: true })
        .limit(limite)
        .skip(desde)
        .populate("usuario", "username email role")
        .populate("categoria", "nombre"),
    ]);
    res.json({
      total,
      productos,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: error.message,
    });
  }
};

const crearProducto = async (req, res) => {
  try {
    const { precio, categoria, descripcion, img } = req.body;
    const nombre = req.body.nombre.toUpperCase();

    //ya existe producto con ese nombre¿?

    const productoBaseDatos = await Producto.findOne({ nombre });

    if (productoBaseDatos) {
      return res.status(400).json({
        ok: false,
        message: `El producto con el nombre ${productoBaseDatos.nombre} ya existe`,
      });
    }

    const data = {
      nombre,
      categoria,
      precio,
      descripcion,
      img,
      usuario: req.user._id,
    };

    const producto = new Producto(data);

    await producto.save();

    res.status(200).json({
      ok: true,
      message: `El producto ${data.nombre} se guardó exitosamente`,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: error.message,
    });
  }
};

const actualizarProducto = async (req, res) => {
  try {
    const { id } = req.params;

    const { precio, categoria, descripcion, disponible } = req.body;
    const usuario = req.user._id;

    let data = {
      precio,
      categoria,
      descripcion,
      disponible,
      usuario,
    };

    if (req.body.nombre) {
      data.nombre = req.body.nombre.toUpperCase();
    }
    await Producto.findByIdAndUpdate(id, data);

    res.status(200).json({
      ok: true,
      message: `Producto actualizado`,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: error.message,
    });
  }
};

const borrarProducto = async (req, res) => {
  try {
    const { id } = req.params;

    await Producto.findByIdAndUpdate(id, { estado: false });

    res.status(200).json({
      ok: true,
      message: `Producto eliminado`,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: error.message,
    });
  }
};
export { crearProducto, obtenerProductos, actualizarProducto, borrarProducto };
