import express from "express";
import bootstrap from "./src/index.router.js";
import dotenv from "dotenv"
dotenv.config()
const app = express();
const port =process.env.PORT;
bootstrap(app, express);
app.listen(port, () => {
  console.log(`SERVER IS RUNNING ON PORT ......${port}`);
});
