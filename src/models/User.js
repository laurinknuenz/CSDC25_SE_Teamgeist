import mongoose from "mongoose";
import bcrypt from "bcrypt";
const { Schema, model } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstname: { type: String },
  lastname: { type: String },
  email: { type: String },
  team: {
    type: Schema.Types.ObjectId,
    ref: "Team",
  },
  role: {
    type: String,
    enum: ["user", "manager"],
  },
});

UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export const User = model("User", UserSchema);