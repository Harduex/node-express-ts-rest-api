import jwt from "jsonwebtoken";
import config from "config";
import { UserAttributes } from "../../Interfaces/UserInterface";
import logger from "./logger";

const signJWT = (
  user: UserAttributes,
  callback: (error: Error | null, token: string | null) => void
): void => {
  const expirationTimeInSeconds = Number(config.get("server.token.expireTime"));

  logger.info(
    `Attempting to sign token for user with id ${user.id}, expires in ${expirationTimeInSeconds} seconds`
  );

  try {
    jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      config.get("server.token.secret"),
      {
        issuer: config.get("server.token.issuer"),
        algorithm: "HS256",
        expiresIn: expirationTimeInSeconds,
      },
      (error, token) => {
        if (error) {
          callback(error, null);
        } else if (token) {
          callback(null, token);
        }
      }
    );
  } catch (error: any) {
    logger.error(error.message, error);
    callback(error, null);
  }
};

export default signJWT;
