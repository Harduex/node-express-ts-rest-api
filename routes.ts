import { Application } from "express-serve-static-core";
import indexRouter from "./App/Controllers/indexController";
import userRouter from "./App/Controllers/userController";
import authRouter from "./App/Controllers/authContoller";
import checkAuthenticated from "./App/Helpers/middlewares/extractJWT";

const routes = (app: Application) => {
  app.use("/api", checkAuthenticated, indexRouter);
  app.use("/api/auth", authRouter);
  app.use("/api/users", checkAuthenticated, userRouter);
};

export default routes;
