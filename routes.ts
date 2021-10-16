import { Application } from "express-serve-static-core";
import indexRouter from "./App/Controllers/indexController";

const routes = (app: Application) => {
  app.use("/", indexRouter);
};

export default routes;
