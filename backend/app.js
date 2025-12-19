import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import protectedRoutes from "./routes/protectedRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
import certificateRoutes from "./routes/certificateRoutes.js";

import errorHandler from "./middleware/errorHandler.js";

const app = express();

// Core middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// CORS (Vite-friendly)
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
      "http://localhost:5176",
    ],
    credentials: true,
  })
);

// ================= ROUTES =================

// Auth (register, login, logout)
app.use("/api/v1", authRoutes);

// Courses
app.use("/api/v1", courseRoutes);

// Protected user routes
app.use("/api/v1/protected", protectedRoutes);

// Quiz routes
app.use("/api/v1/quiz", quizRoutes);

// Certificate routes
app.use("/api/v1/certificates", certificateRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("UpCraft API is running...");
});

// Error handler (LAST)
app.use(errorHandler);

export default app;
