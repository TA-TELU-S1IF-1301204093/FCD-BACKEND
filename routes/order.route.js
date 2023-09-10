import express from "express";
const router = express.Router();
import {
  addOrder,
  todayOrders,
  deleteOrder,
  summaryOrder,
  searchOrder,
} from "../controllers/order.controller.js";

router.post("/order", addOrder);
router.get("/order", todayOrders);
router.delete("/order", deleteOrder);
router.get("/summary", summaryOrder);
router.get("/search", searchOrder);

export default router;
