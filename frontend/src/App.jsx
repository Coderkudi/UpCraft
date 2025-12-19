import { BrowserRouter, Route, Routes } from "react-router-dom";


import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import ChangePassword from "./pages/changePassword";
import UpdateProfile from "./pages/updateProfile";
import React from "react";
import Navbar from "./components/Navbar";
<<<<<<< HEAD
import Home from "./pages/Home";
import CourseList from "./pages/CourseList";
import CourseDetail from "./pages/CourseDetail";
import Lesson from "./pages/Lesson";
import Quiz from "./pages/Certificate";
import Certificate from "./pages/Certificate";
=======


import CourseList from "./pages/CourseList";
import CourseDetail from "./pages/CourseDetail";
import DemoLesson from "./pages/DemoLesson";
import DemoQuiz from "./pages/DemoQuiz";
import DemoQuizResult from "./pages/DemoQuizResult";
import DemoCertificate from "./pages/DemoCertificate";
>>>>>>> feature/quiz-certifications

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
       
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

       
        <Route path="/" element={<CourseList />} />
        <Route path="/course/:courseId" element={<CourseDetail />} />
        <Route
          path="/course/:courseId/lesson/:lessonId"
          element={<DemoLesson />}
        />
        <Route path="/course/:courseId/quiz" element={<DemoQuiz />} />
        <Route
          path="/course/:courseId/quiz/result"
          element={<DemoQuizResult />}
        />
        <Route
          path="/course/:courseId/certificate"
          element={<DemoCertificate />}
        />

        
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        <Route
          path="/change-password"
          element={
            <PrivateRoute>
              <ChangePassword />
            </PrivateRoute>
          }
        />

        <Route
          path="/update-profile"
          element={
            <PrivateRoute>
              <UpdateProfile />
            </PrivateRoute>
          }
        />
        <Route path="/courses" element={<Courses />} />
        <Route path="/course/:courseId" element={<CourseDetail />} />
        <Route path="/course/:courseId/lesson/:lessonId" element={<Lesson />} />
      </Routes>
    </BrowserRouter>
  );
}

// <Route path="/" element={<Home />} />
