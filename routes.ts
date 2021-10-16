import { Application } from "express-serve-static-core";
import indexRouter from "./App/Controllers/indexController";
import usersRouter from "./App/Controllers/usersController";

const routes = (app: Application) => {
  app.use("/", indexRouter);
  app.use("/users", usersRouter);
};

export default routes;
