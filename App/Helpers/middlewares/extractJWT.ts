import { Request, Response, NextFunction } from "express";
import logger from "../utilities/logger";
import jwt from "jsonwebtoken";
import config from "config";
import { throwError } from "../utilities/error";

const extractJWT = (req: Request, res: Response, next: NextFunction) => {
  logger.info("Validating token");

  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, config.get("server.token.secret"), (error, decoded) => {
      if (error) {
        return res.status(404).json({
          error: error,
        });
      } else {
        res.locals.user = decoded;
        next();
      }
    });
  } else {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
};

export default extractJWT;
