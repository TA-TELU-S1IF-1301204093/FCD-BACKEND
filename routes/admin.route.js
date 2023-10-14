import express from "express";
import {
    addOrderPrice,
    createAdmin,
    createUser,
    deleteAllOrderFromUser,
    deleteAllorders,
    deleteUser,
    editOrderPrice,
    getAllOrderFromOneUser,
    getAllOrderFromUsers,
    getAllOrderPrice,
    getAllUsers,
    getOrderPrice,
    loginAdmin,
} from "../controllers/admin.controller.js";
import { validateAdmin } from "../middleware/admin.middleware.js";
const router = express.Router();

router.get("/users", validateAdmin, getAllUsers);
router.post("/users", validateAdmin, createUser);
router.post("/login", loginAdmin);
router.post("/register", createAdmin);
router.delete("/users", validateAdmin, deleteUser);
router.get("/orders", validateAdmin, getAllOrderFromUsers);
router.post("/orders", validateAdmin, getAllOrderFromOneUser);
router.delete("/orders", validateAdmin, deleteAllorders);
router.delete("/orders/order", validateAdmin, deleteAllOrderFromUser);
router.post("/orders/price", validateAdmin, addOrderPrice);
router.get("/orders/price", validateAdmin, getAllOrderPrice);
router.get("/orders/order/price", validateAdmin, getOrderPrice);
router.put("/orders/price/:orderId", validateAdmin, editOrderPrice);

export default router;
