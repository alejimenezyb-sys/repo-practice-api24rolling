import { Schema, model } from "mongoose";

const CategoriaSchema = new Schema(
  {
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
    },
  },
  {
    timestamps: {
      createdAt: "creado_el",
      updatedAt: "actualizado_el",
    },
  },
);

export default model("Categoria", CategoriaSchema);
