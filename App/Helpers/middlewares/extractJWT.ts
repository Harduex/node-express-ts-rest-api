import { Request, Response, NextFunction } from "express";
import logger from "../utilities/logger";
import jwt from "jsonwebtoken";
import config from "config";
import { throwError } from "../utilities/error";
import HttpStatusCode from "../../Enums/HttpStatusCodes";

const extractJWT = (req: Request, res: Response, next: NextFunction) => {
  logger.info("Validating token");

  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, config.get("server.token.secret"), (error, decoded) => {
      if (error) {
        return res.status(HttpStatusCode.NOT_FOUND).json({
          error: error,
        });
      } else {
        res.locals.user = decoded;
        next();
      }
    });
  } else {
    return res.status(HttpStatusCode.UNAUTHORIZED).json({
      message: "Unauthorized",
    });
  }
};

export default extractJWT;
