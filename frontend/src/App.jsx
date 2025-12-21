import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/changePassword";
import UpdateProfile from "./pages/updateProfile";

import CourseList from "./pages/CourseList";
import CourseDetail from "./pages/CourseDetail";
import Lesson from "./pages/Lesson";

import DemoLesson from "./pages/DemoLesson";
import DemoQuiz from "./pages/DemoQuiz";
import DemoQuizResult from "./pages/DemoQuizResult";
import DemoCertificate from "./pages/DemoCertificate";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/courses" element={<CourseList />} />

        {/* COURSE FLOW */}
        <Route path="/course/:courseId" element={<CourseDetail />} />
        <Route path="/course/:courseId/lesson/:lessonId" element={<Lesson />} />
        <Route path="/course/:courseId/quiz" element={<DemoQuiz />} />
        <Route
          path="/course/:courseId/quiz/result"
          element={<DemoQuizResult />}
        />
        <Route
          path="/course/:courseId/certificate"
          element={<DemoCertificate />}
        />

        {/* PROTECTED */}
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
      </Routes>
    </BrowserRouter>
  );
}
