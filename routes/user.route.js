import express from "express";
const router = express.Router();

import {
    fetchUser,
    settings,
    decodeUserToken,
} from "../controllers/user.controller.js";

router.get("/", fetchUser);
router.get("/decode", decodeUserToken);
router.put("/settings", settings);

export default router;
