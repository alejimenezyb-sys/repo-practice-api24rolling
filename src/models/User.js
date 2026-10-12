import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
const UsersChema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin", "superAdmin"],
      default: "user",
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    verificationCode: {
      type: String,
    },
    verificationCodeExpires: {
      type: Date,
    },
  },
  {
    timestamps: {
      createdAt: "creado_el",
      updatedAt: "modificado_el",
    },
  },
);

//hasheo contrasena

UsersChema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  const salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
});

//Generar código de verificación

UsersChema.methods.generateVerificationCode = function () {
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  this.verificationCode = code;
  this.verificationCodeExpires = Date.now() + 15 * 60 * 1000;
  return code;
};

export default model("User", UsersChema);
