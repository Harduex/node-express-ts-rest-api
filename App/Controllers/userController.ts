import express, { Router } from "express";
import validateResource from "../Helpers/middlewares/validateResource";
import db from "../Helpers/utilities/database";
import { throwError } from "../Helpers/utilities/error";
import { createUserSchema, logInUserSchema } from "../Validations/userSchema";
import bcryptjs from "bcryptjs";
import signJWT from "../Helpers/utilities/signJWT";
import checkAuthenticated from "../Helpers/middlewares/extractJWT";
import { UserAttributes } from "../Interfaces/UserInterface";
import logger from "../Helpers/utilities/logger";
import HttpStatusCode from "../Enums/HttpStatusCodes";
import config from "config";

const router: Router = express.Router();

router.get("/get/all", async (req, res) => {
  const users = await db.User.findAll({ attributes: ["id", "username", "email"] });
  res.status(HttpStatusCode.OK).json({
    users: users,
    count: users.length,
  });
});

router.get("/get/current", async (req, res) => {
  const user = res.locals.user;
  res.status(HttpStatusCode.OK).send(user);
});

export default router;
