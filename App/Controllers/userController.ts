import express, { Router } from "express";
import validateResource from "../Helpers/middlewares/validateResource";
import db from "../Helpers/utilities/database";
import { throwError } from "../Helpers/utilities/error";
import { createUserSchema, logInUserSchema } from "../Validations/userSchema";
import bcryptjs from "bcryptjs";
import signJWT from "../Helpers/utilities/signJWT";
import extractJWT from "../Helpers/middlewares/extractJWT";
import { UserAttributes } from "../Interfaces/UserInterface";
import logger from "../Helpers/utilities/logger";
import HttpStatusCode from "../Enums/HttpStatusCodes";
import config from "config";

const router: Router = express.Router();

router.get("/validate", extractJWT, async (req, res) => {
  res.json({
    message: "Token validated",
  });
});

router.post("/register", validateResource(createUserSchema), async (req, res, next) => {
  const user = req.body;
  try {
    const newUser: UserAttributes | null = await db.User.create(user);
    if (newUser != null) {
      logger.info(`User with id: ${newUser.id} created`);
      return res.status(HttpStatusCode.OK).json({
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      });
    } else {
      next(throwError("Server Error", HttpStatusCode.INTERNAL_SERVER_ERROR));
    }
  } catch (error: any) {
    next(throwError(error.message, HttpStatusCode.INTERNAL_SERVER_ERROR));
  }
});

router.post("/login", validateResource(logInUserSchema), async (req, res, next) => {
  const { username, password } = req.body;

  const user: UserAttributes | null = await db.User.findOne({
    where: {
      username: username,
    },
  });

  if (user != null) {
    bcryptjs.compare(password, user.password, (error: any, result: boolean) => {
      if (error || !result) {
        next(throwError("Wrong password or username", HttpStatusCode.UNAUTHORIZED));
      } else if (result) {
        signJWT(user, (_error, token) => {
          if (_error) {
            next(throwError("Unable to Sign JWT", HttpStatusCode.UNAUTHORIZED));
          } else if (token) {
            return res.status(HttpStatusCode.OK).json({
              message: "Authorized",
              token: token,
              expireTime: config.get("server.token.expireTime"),
              user: {
                id: user.id,
                username: user.username,
                email: user.email,
              },
            });
          }
        });
      }
    });
  } else {
    next(throwError("User didn't exist", 404));
  }
});

router.get("/get/all", async (req, res) => {
  const users = await db.User.findAll({ attributes: ["id", "username", "email"] });
  res.status(HttpStatusCode.OK).json({
    users: users,
    count: users.length,
  });
});

router.get("/get/current", extractJWT, async (req, res) => {
  const user = res.locals.user;
  res.status(HttpStatusCode.OK).send(user);
});

export default router;
