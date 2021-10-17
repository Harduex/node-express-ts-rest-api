import express, { Router } from "express";
import db from "../Helpers/utilities/database";

const router: Router = express.Router();

router.get("/", async (req, res) => {
  res.json({
    message: "Hello Api",
  });
});

export default router;
