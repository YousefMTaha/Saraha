import connectDB from "../DB/connection.js";
import userModule from "../src/module/user/user.router.js";
import postModule from "../src/module/post/post.router.js";
import { globalErrorHandling } from "./utils/errorHanding.js";
const bootstrap = (app, express) => {
  app.use(express.json());

  app.use("/user", userModule);
  app.use("/post", postModule);

  app.use("*", (req, res, next) => {
    return res.json({ message: "In-valid Routing Plz check url  or  method" });
  });
  app.use(globalErrorHandling);
  connectDB();
};
export default bootstrap;
