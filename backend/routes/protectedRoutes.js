import express from "express";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/me", auth, (req, res) => {
  res.json({ message: "protected", userId: req.user.id });
});

export default router;
