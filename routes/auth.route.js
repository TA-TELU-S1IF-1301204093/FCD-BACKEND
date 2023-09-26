import express from "express";
import { Signin } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signin", Signin);

export default router;
