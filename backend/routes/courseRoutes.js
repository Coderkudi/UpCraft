
import express from 'express';
const router = express.Router();
import * as courseController from '../controllers/courseController.js';

// GET all courses
router.get('/courses', courseController.getAllCourses);

// GET lessons for a specific course
router.get('/courses/:courseId/lessons', courseController.getCourseLessons);

// POST complete a lesson
router.post('/lessons/:lessonId/complete', courseController.completeLesson);



export default router;
