"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const config_1 = __importDefault(require("config"));
dotenv_1.default.config();
const port = config_1.default.get("server.port");
const host = config_1.default.get("server.host");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.listen(port, () => {
    console.log(`App is running at http://${host}:${port}`);
});
