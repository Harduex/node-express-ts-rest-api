import express from "express";
import dotenv from "dotenv";
dotenv.config();
import config from "config";

const port: number = config.get<number>("server.port");
const host: string = config.get<string>("server.host");

const app = express();

app.use(express.json());

app.listen(port, () => {
  console.log(`App is running at http://${host}:${port}`);
});
