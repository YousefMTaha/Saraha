import { Schema, Types, model } from "mongoose";
const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: { type: String, required: true },
    userId: {
      type: Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);
const postModel = model("post", postSchema);
export default postModel;
