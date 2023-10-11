import express from "express";
const router = express.Router();

import {
    createHelp,
    deleteAllHelp,
    deleteOneHelp,
    fetchHelp,
} from "../controllers/help.controller.js";
import { validateAdmin } from "../middleware/admin.middleware.js";

router.get("/", fetchHelp);
router.post("/", validateAdmin, createHelp);
router.delete("/", validateAdmin, deleteAllHelp);
router.delete("/:helpId", validateAdmin, deleteOneHelp);

export default router;
