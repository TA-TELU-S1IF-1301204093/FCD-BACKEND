import express from "express";
const router = express.Router();

import { createHelp, fetchHelp } from "../controllers/help.controller.js";

router.get("/", fetchHelp);
router.post("/", createHelp);

export default router;
