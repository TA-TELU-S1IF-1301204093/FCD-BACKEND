import express from "express";
import {
  createAdmin,
  createUser,
  deleteUser,
  getAllOrderFromOneUser,
  getAllOrderFromUsers,
  getAllUsers,
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

export default router;
