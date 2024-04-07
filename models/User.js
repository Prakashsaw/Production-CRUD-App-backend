import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      default: 0,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("userdb", userSchema);

export default User;
