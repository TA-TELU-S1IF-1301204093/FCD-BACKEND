import express from "express";
const router = express.Router();
import {
    addOrder,
    todayOrders,
    deleteOrder,
    summaryOrder,
    searchOrder,
    orderDetail,
} from "../controllers/order.controller.js";

router.post("/order", addOrder);
router.post("/", todayOrders);
router.delete("/order/:orderId/:userId", deleteOrder);
router.post("/summary", summaryOrder);
router.post("/search", searchOrder);
router.post("/detail", orderDetail);

export default router;
