// import { BrowserRouter, Route, Routes } from "react-router-dom";

// import PrivateRoute from "./components/PrivateRoute";
// import Login from "./pages/Login";
// import Profile from "./pages/Profile";
// import Register from "./pages/Register";
// import ChangePassword from "./pages/changePassword";
// import UpdateProfile from "./pages/updateProfile";
// import Navbar from "./components/Navbar";
// export default function App() {
//   return (
//     <BrowserRouter>
//       <Navbar />
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />

//         <Route
//           path="/profile"
//           element={
//             <PrivateRoute>
//               <Profile />
//             </PrivateRoute>
//           }
//         />

//         <Route
//           path="/change-password"
//           element={
//             <PrivateRoute>
//               <ChangePassword />
//             </PrivateRoute>
//           }
//         />

//         <Route
//           path="/update-profile"
//           element={
//             <PrivateRoute>
//               <UpdateProfile />
//             </PrivateRoute>
//           }
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// }


import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
// import Profile from './pages/Profile';
// import CourseList from './pages/CourseList';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail'; // Renamed from DemoCourse
import Lesson from './pages/Lesson';
// import Quiz from './pages/Quiz';
// import Certificate from './pages/Certificate';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-950 text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          {/* <Route path="/profile" element={<Profile />} /> */}
          <Route path="/course/:courseId" element={<CourseDetail />} />
          <Route path="/course/:courseId/lesson/:lessonId" element={<Lesson />} />
          {/* <Route path="/course/:courseId/quiz" element={<Quiz />} />
          <Route path="/course/:courseId/certificate" element={<Certificate />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
