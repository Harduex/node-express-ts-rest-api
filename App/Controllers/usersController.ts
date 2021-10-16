import express, { Router } from "express";
import db from "../Helpers/utilities/database";
const router: Router = express.Router();

router.get("/", async (req, res) => {
  const users = await db.User.findAll({
    include: {
      model: db.Project,
    },
  });
  res.json(users);
});

export default router;
