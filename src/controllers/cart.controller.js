import Cart from "../models/Cart.js";
import Producto from "../models/Product.js";

//get carrito usuario

export const getItems = async (req, res) => {
  try {
    const cart = await Cart.findOne({ usuario: req.user._id }).populate(
      "items.producto",
    );
    console.log(cart.items.lenght);

    res.status(200).json(cart || { items: [], total: 0 });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: error.message,
    });
  }
};
