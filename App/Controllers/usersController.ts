import express, { Router } from "express";
import validateResource from "../Helpers/middlewares/validateResource";
import db from "../Helpers/utilities/database";
import { createUserSchema } from "../Validations/userSchema";
const router: Router = express.Router();

router.get("/", async (req, res) => {
  const users = await db.User.findAll();
  res.json(users);
});

router.post("/", validateResource(createUserSchema), async (req, res) => {
  const user = req.body;
  try {
    const result = await db.User.create(user);
    res.status(200).send(result);
  } catch (error: any) {
    res.status(409).send(error.message);
  }
});


export default router;
