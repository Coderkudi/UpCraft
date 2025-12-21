import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import {
  BookOpen,
  GraduationCap,
  Zap,
  Wrench,
  Languages,
  Monitor,
} from "lucide-react";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1️⃣ Courses are mandatory
        const coursesRes = await api.get("/courses");
        setCourses(coursesRes.data.data || []);

        // 2️⃣ Certificates are OPTIONAL
        try {
          const certsRes = await api.get("/certificates/my");
          setCertificates(certsRes.data.data || []);
        } catch (err) {
          console.warn("Certificates fetch failed, continuing without them");
          setCertificates([]);
        }
      } catch (error) {
        console.error("Failed to fetch courses", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getIcon = (id) => {
    switch (id) {
      case "electrical":
        return <Zap className="w-8 h-8 text-yellow-500" />;
      case "plumbing":
        return <Wrench className="w-8 h-8 text-blue-500" />;
      case "english":
        return <Languages className="w-8 h-8 text-red-500" />;
      case "computer":
        return <Monitor className="w-8 h-8 text-green-500" />;
      default:
        return <BookOpen className="w-8 h-8 text-purple-500" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 bg-gray-800 rounded-full mb-4"></div>
          <div className="h-4 w-32 bg-gray-800 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* HEADER (merged safely) */}
        <header className="mb-12 text-center">
          <div className="inline-block p-3 rounded-full bg-blue-900/30 mb-4 border border-blue-500/30">
            <GraduationCap className="w-10 h-10 text-blue-400" />
          </div>
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent mb-4">
            UpCraft Skills Academy
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Select a trade or skill to begin your journey.
          </p>
        </header>

        {/* CERTIFICATES SECTION */}
        {certificates.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <GraduationCap className="text-yellow-400" /> My Certificates
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="bg-gray-900 border border-gray-800 p-6 rounded-xl flex items-center justify-between"
                >
                  <div>
                    <h4 className="font-bold text-lg text-white">
                      {cert.courseName}
                    </h4>
                    <p className="text-sm text-gray-500">
                      Earned on {new Date(cert.date).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      navigate(`/course/${cert.courseId}/certificate`)
                    }
                    className="text-sm text-blue-400 hover:underline"
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* COURSES */}
        <h2 className="text-2xl font-bold mb-6 text-gray-200">
          Available Courses
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {courses.map((course) => (
            <div
              key={course.id}
              onClick={() => navigate(`/course/${course.id}`)}
              className="group bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden cursor-pointer"
            >
              <div className="h-40 overflow-hidden relative">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                />
                <div className="absolute top-4 right-4 bg-black/60 p-2 rounded-lg">
                  {getIcon(course.id)}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-100 mb-2">
                  {course.title}
                </h3>
                <p className="text-sm text-gray-400 line-clamp-2">
                  {course.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseList;
