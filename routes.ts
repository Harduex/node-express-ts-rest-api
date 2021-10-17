import { Application } from "express-serve-static-core";
import indexRouter from "./App/Controllers/indexController";
import userRouter from "./App/Controllers/userController";

const routes = (app: Application) => {
  app.use("/", indexRouter);
  app.use("/users", userRouter);
};

export default routes;
