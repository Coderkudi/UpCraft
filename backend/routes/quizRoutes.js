
import express from "express";
import { submitQuizResult, getQuizResults } from "../controllers/quizController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/submit", protect, submitQuizResult);
router.get("/my-results", protect, getQuizResults);

export default router;
