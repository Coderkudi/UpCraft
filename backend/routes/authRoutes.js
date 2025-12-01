import express from "express";
import {
  hello,
  login,
  logout,
  register,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
// router.post("/refresh-token", refreshToken);

router.get("/hello", hello);

export default router;
