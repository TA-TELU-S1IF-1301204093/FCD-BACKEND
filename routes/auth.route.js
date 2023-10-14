import express from "express";
import { Signin, Signup } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signin", Signin);
router.post("/signup", Signup);

export default router;
