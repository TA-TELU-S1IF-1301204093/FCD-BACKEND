import express from "express";
const router = express.Router();
import {
  addOrder,
  todayOrders,
  deleteOrder,
} from "../controllers/order.controller.js";

router.post("/order", addOrder);
router.get("/order", todayOrders);
router.delete("/order", deleteOrder);

export default router;
