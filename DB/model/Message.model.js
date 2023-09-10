import { Schema, Types, model } from "mongoose";
const messageSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: { type: String, required: true },
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);
const messageModel = model("Message", messageSchema);
export default messageModel;
