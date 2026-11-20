import Cart from "../models/Cart.js";
import Producto from "../models/Product.js";

//get carrito usuario

export const getItems = async (req, res) => {
  try {
    const cart = await Cart.findOne({ usuario: req.user._id }).populate(
      "items.producto",
    );
    // console.log(cart.items.lenght);

    return res.status(200).json(cart || { items: [], total: 0 });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: error.message,
    });
  }
};
//agregar al carrito
export const addItem = async (req, res) => {
  try {
    const { productoId, cantidad } = req.body;

    let producto = await Producto.findById(productoId);

    let cart = await Cart.findOne({ usuario: req.user._id });

    if (!cart) {
      cart = new Cart({ usuario: req.user._id, items: [] });
    }
    const itemExiste = cart.items.find(
      (item) => item.producto.toString() === productoId,
    );

    if (itemExiste) {
      itemExiste.cantidad = +cantidad;
    } else {
      cart.items.push({
        producto: productoId,
        cantidad,
        precioUnitario: producto.precio,
      });
    }
    cart.calcularTotal();
    await cart.save();

    return res.status(201).json({
      ok: true,
      message: "Producto agregago al carrito!",
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: error.message,
    });
  }
};

//eliminar un item del carrito

export const deleteItem = async (req, res) => {
  try {
    const { productoId } = req.params;

    const cart = await Cart.findOne({ usuario: req.user._id });

    if (!cart) {
      return res.status(404).json({
        ok: false,
        message: "Carrito no encontrado",
      });
    }
  } catch (error) {}
};
