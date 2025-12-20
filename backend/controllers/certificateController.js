import Certificate from "../models/Certificate.model.js";
import QuizResult from "../models/QuizResult.model.js";

export const createCertificate = async (req, res, next) => {
    try {
        const { courseId, courseName } = req.body;
        const userId = req.user.id;

        if (!courseId || !courseName) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const passedQuiz = await QuizResult.findOne({
            userId,
            courseId,
            passed: true
        });

        if (!passedQuiz) {
            return res.status(400).json({ message: "You have not passed the quiz for this course." });
        }

        const existing = await Certificate.findOne({ userId, courseId });
        if (existing) {
            return res.status(409).json({ message: "Certificate already exists for this course.", data: existing });
        }

        const certificateId = `UPCRAFT-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

        const certificate = await Certificate.create({
            certificateId,
            userId,
            courseId,
            courseName,
        });

        res.status(201).json({
            message: "Certificate generated successfully",
            data: certificate
        });
    } catch (error) {
        if (next) next(error);
        else res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getCertificate = async (req, res, next) => {
    try {
        const { id } = req.params;
        const certificate = await Certificate.findOne({ certificateId: id });
        if (!certificate) return res.status(404).json({ message: "Certificate not found" });
        res.status(200).json({ data: certificate });
    } catch (error) {
        if (next) next(error);
        else res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getCertificatesByUser = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const certificates = await Certificate.find({ userId }).sort({ issuedAt: -1 });
        res.status(200).json({ data: certificates });
    } catch (error) {
        if (next) next(error);
        else res.status(500).json({ message: "Server Error", error: error.message });
    }
};
