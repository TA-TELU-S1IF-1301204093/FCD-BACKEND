import express from "express";
import {
  createAdmin,
  createUser,
  getAllUsers,
  loginAdmin,
} from "../controllers/admin.controller.js";
import { validateAdmin } from "../middleware/admin.middleware.js";
const router = express.Router();

router.get("/users", validateAdmin, getAllUsers);
router.post("/users", validateAdmin, createUser);
router.post("/login", loginAdmin);
router.post("/register", createAdmin);

export default router;
