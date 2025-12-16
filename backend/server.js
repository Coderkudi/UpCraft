// import dotenv from "dotenv";
// import app from "./app.js";
// import connectDB from "./config/db.js";
// dotenv.config({ path: ".env" });

// connectDB();

// app.listen(process.env.PORT, () => {
//   console.log(`Server running on port ${process.env.PORT}`);
// });



import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import courseRoutes from './routes/courseRoutes.js';

const app = express();
const PORT = 5000; // Hardcoded specific port for backend

// Middleware
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:5176'], // Allow Vite frontend on various ports
    credentials: true
}));
app.use(bodyParser.json());

// Routes
app.use('/api/v1', courseRoutes);

// Health Check
app.get('/', (req, res) => {
    res.send('UpCraft API is running...');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
