import { Schema, model } from "mongoose";
import { defaultMaxListeners } from "nodemailer/lib/xoauth2";

const ProductoSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    unique: true,
  },
  estado: {
    type: Boolean,
    default: true,
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  precio: {
    type: Number,
    default: 0,
  },
  categoría: {
    type: Schema.Types.ObjectId,
    ref: "Categoria",
    required: true,
  },
  descripcion: {
    type: String,
  },
  disponible: {
    type: Boolean,
    default: true,
  },
  img: {
    type: String,
    default:
      "https://programacion.net/files/article/20161110041116_image-not-found.png",
  },
});
export default model("Producto", ProductoSchema);
