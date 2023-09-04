import express from "express";
const router = express.Router();
import { addOrder } from "../controllers/order.controller.js";

router.post("/order", addOrder);

export default router;
