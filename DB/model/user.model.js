import { Schema, Types, model } from "mongoose";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: Number,
    gander: {
      type: String,
      default: "Male",
      enum: ["Male", "Female"], 
    },
    phone: {
      type: String,
      unique: true,
      required: true,
    },
    message:[{
      type:Types.ObjectId,
      ref:"Message"
    }]
  },
  { timestamps: true }
);
const userModule = model("User", userSchema);

export default userModule;
