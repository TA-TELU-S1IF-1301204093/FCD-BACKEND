import express from "express";
const router = express.Router();

import { settings } from "../controllers/user.controller.js";

router.put("/settings", settings);

export default router;
