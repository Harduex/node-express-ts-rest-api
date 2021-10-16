import express, { Application } from "express";

// Utilities
import path from 'path';

// Configurations
import dotenv from "dotenv";
dotenv.config();
import config from "config";


// Routes
import useRoutes from "./routes";

const port: number = config.get<number>("server.port");
const host: string = config.get<string>("server.host");

const app: Application = express();

// Utilities
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Use routes
useRoutes(app);

app.listen(port, () => {
  console.log(`App is running at http://${host}:${port}`);
});
