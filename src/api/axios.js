import axios from "axios";
import { courses } from "./data";

// Create Axios Instance
const api = axios.create({
    baseURL: "/api/v1", // Standard UpCraft API base
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

// Helper: Parse courseId from URL
// Helper: Parse courseId from URL
const getCourseId = (url) => {
    try {
        const parts = url.split('/');
        const courseIndex = parts.indexOf('courses');
        if (courseIndex !== -1 && parts[courseIndex + 1]) {
            return parts[courseIndex + 1];
        }
    } catch (e) {
        return null;
    }
    return null;
};

// MOCK INTERCEPTOR
api.interceptors.request.use(async (config) => {
    await new Promise(resolve => setTimeout(resolve, 600)); // Latency sim

    const { url, method } = config;
    const courseId = getCourseId(url);

    console.log(`[Mock API] ${method.toUpperCase()} ${url} (Course: ${courseId})`);

    // 0. GET All Courses (for Home Page)
    if (method === 'get' && url.endsWith('/courses')) {
        return Promise.reject({
            config,
            response: {
                status: 200,
                data: { success: true, data: Object.values(courses) }
            },
            isMock: true
        });
    }

    // 1. GET Specific Course/Lessons
    if (method === 'get' && url.includes('/lessons') && !url.includes('complete')) {
        const course = courses[courseId];
        if (course) {
            return Promise.reject({
                config,
                response: {
                    status: 200,
                    data: { success: true, data: course.lessons, courseTitle: course.title }
                },
                isMock: true
            });
        }
    }

    // 2. POST Complete Lesson
    if (method === 'post' && url.includes('/complete')) {
        return Promise.reject({
            config,
            response: {
                status: 200,
                data: { success: true, message: "Lesson marked as complete" }
            },
            isMock: true
        });
    }

    // 3. GET Quiz
    if (method === 'get' && url.includes('/quiz') && !url.includes('submit')) {
        const course = courses[courseId];
        if (course && course.quiz) {
            return Promise.reject({
                config,
                response: {
                    status: 200,
                    data: { success: true, data: course.quiz }
                },
                isMock: true
            });
        }
    }

    // 4. POST Submit Quiz (Logic: Check 50% score)
    if (method === 'post' && url.includes('/quiz/submit')) {
        const course = courses[courseId];
        const userAnswers = JSON.parse(config.data).answers; // { 0: optionObj, 1: optionObj }

        let score = 0;
        const questions = course.quiz.questions;
        let total = questions.length;

        questions.forEach((q, idx) => {
            const selected = userAnswers[idx];
            if (selected && selected.isCorrect) {
                score++;
            }
        });

        const percentage = (score / total) * 100;
        const passed = percentage >= 50;

        return Promise.reject({
            config,
            response: {
                status: 200,
                data: {
                    success: true,
                    message: passed ? "Quiz Passed!" : "Quiz Failed. Score too low.",
                    passed: passed,
                    score: score,
                    total: total,
                    percentage: percentage
                }
            },
            isMock: true
        });
    }

    // 5. POST Generate Certificate
    if (method === 'post' && url.includes('/certificate/generate')) {
        const course = courses[courseId];
        return Promise.reject({
            config,
            response: {
                status: 200,
                data: {
                    success: true,
                    data: {
                        studentName: "Demo User",
                        courseName: course ? course.title : "Course Completion"
                    }
                }
            },
            isMock: true
        });
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

// Response Interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.isMock && error.response) {
            console.log("Mock Response:", error.config.url, error.response.status);
            return Promise.resolve(error.response);
        }
        return Promise.reject(error);
    }
);

export default api;
