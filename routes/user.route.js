import express from "express";
const router = express.Router();

import {
    fetchUser,
    settings,
    decodeUserToken,
} from "../controllers/user.controller.js";

router.post("/", fetchUser);
router.get("/decode", decodeUserToken);
router.put("/settings", settings);

export default router;
