import authMiddleware from "../middleware/authMiddleware.js";

import express from "express";
import {
  hello,
  login,
  logout,
  register,
  updateProfile,
  getMe,
  changePassword,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

router.get("/hello", hello);
router.get("/me", authMiddleware, getMe);
router.put("/update-profile", authMiddleware, updateProfile);
router.put("/change-password", authMiddleware, changePassword);
export default router;
