import express, { Application } from "express";

// Utilities
import path from "path";

// Configurations
import dotenv from "dotenv";
dotenv.config();
import config from "config";

// Routes
import useRoutes from "./routes";

// Custom logger
import logger from "./App/Helpers/utilities/logger";

// Databse utilities
import db from "./App/Helpers/utilities/database";
import seedDb from "./App/Helpers/utilities/seed";

// Port
const port: number = config.get<number>("server.port");

// App
const app: Application = express();

// Utilities
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// Use routes
useRoutes(app);

// Seed the DB
seedDb();

// DB connection and start server
db.sequelize.sync().then(() => {
  app.listen(port, async () => {
    logger.info(`DB connected`);
    logger.info(`App listening on port ${port}`);
  });
});
