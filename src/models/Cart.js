import { Schema, model } from "mongoose";

//items
const CartItemSchema = new Schema({
  producto: {
    type: Schema.Types.ObjectId,
    ref: "Producto",
    required: true,
  },
  cantidad: {
    type: Number,
    required: true,
    min: 1,
  },
  precioUnitario: {
    type: Number,
    required: true,
  },
});

//carrito

const CartSchema = new Schema(
  {
    usuario: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    items: [CartItemSchema],
    total: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

//función para calcular el total, parte del modelo

CartSchema.methods.calcularTotal = function () {
  this.total = this.items.reduce(
    (accum, item) => accum + item.precioUnitario * item.cantidad,
    0,
  );
  return this.total;
};

export default model("Cart", CartSchema);
