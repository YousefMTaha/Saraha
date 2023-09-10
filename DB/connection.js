import mongoose from "mongoose";

const connectDB = async () => {
  return await mongoose
    .connect(process.env.DB_LOCAL)
    .then(() => {
      console.log("DB Running");
    })
    .catch((err) => {
      console.log("connection err", err.message);
    });
};
export default connectDB;
