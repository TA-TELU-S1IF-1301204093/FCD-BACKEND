import express from "express";
const router = express.Router();

import { fetchUser, settings } from "../controllers/user.controller.js";

router.get("/", fetchUser);
router.put("/settings", settings);

export default router;
