import QuizResult from "../models/QuizResult.model.js";

export const submitQuizResult = async (req, res, next) => {
    try {
        const { courseId, score, totalQuestions } = req.body;
        const userId = req.user.id;

        if (!courseId || score === undefined || !totalQuestions) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const percentage = (score / totalQuestions) * 100;
        const passed = percentage >= 50;

        const quizResult = await QuizResult.create({
            userId,
            courseId,
            score,
            percentage,
            passed,
        });

        res.status(201).json({
            message: "Quiz submitted successfully",
            data: quizResult,
        });
    } catch (error) {
        if (next) next(error);
        else res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getQuizResults = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const results = await QuizResult.find({ userId }).sort({ attemptedAt: -1 });
        res.status(200).json({ data: results });
    } catch (error) {
        if (next) next(error);
        else res.status(500).json({ message: "Server Error", error: error.message });
    }
};
