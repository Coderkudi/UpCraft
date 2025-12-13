
const courses = require('../data/courses');

// 0. GET All Courses (for Home Page)
exports.getAllCourses = (req, res) => {
    try {
        const courseList = Object.values(courses).map(c => ({
            id: c.id,
            title: c.title,
            description: c.description,
            thumbnail: c.thumbnail,
            lessons: c.lessons // Sending lessons length for count in UI
        }));
        res.status(200).json({ success: true, data: courseList });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// 1. GET Specific Course/Lessons
exports.getCourseLessons = (req, res) => {
    try {
        const { courseId } = req.params;
        const course = courses[courseId];

        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }

        res.status(200).json({
            success: true,
            data: course.lessons,
            courseTitle: course.title
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// 2. POST Complete Lesson
exports.completeLesson = (req, res) => {
    // In a real DB app, we would save this to the user's profile.
    // For now, we just acknowledge the request as the frontend handles local storage state.
    res.status(200).json({ success: true, message: "Lesson marked as complete" });
};
