import express from "express";
const router = express.Router();

import { createHelp, fetchHelp } from "../controllers/help.controller.js";
import { validateAdmin } from "../middleware/admin.middleware.js";

router.get("/", fetchHelp);
router.post("/", validateAdmin, createHelp);

export default router;
