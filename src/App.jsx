import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import CourseList from './pages/CourseList';
import CourseDetail from './pages/CourseDetail'; // Renamed from DemoCourse
import Lesson from './pages/Lesson';
import Quiz from './pages/Quiz';
import Certificate from './pages/Certificate';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-950 text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<CourseList />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/course/:courseId" element={<CourseDetail />} />
          <Route path="/course/:courseId/lesson/:lessonId" element={<Lesson />} />
          <Route path="/course/:courseId/quiz" element={<Quiz />} />
          <Route path="/course/:courseId/certificate" element={<Certificate />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
