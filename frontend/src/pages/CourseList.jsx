import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
<<<<<<< HEAD
import api from '../api/axios';
=======
import api from '../api/axiosmock';
>>>>>>> feature/quiz-certifications
import { BookOpen, GraduationCap, Zap, Wrench, Languages, Monitor } from 'lucide-react';

const CourseList = () => {
    const [courses, setCourses] = useState([]);
<<<<<<< HEAD
=======
    const [certificates, setCertificates] = useState([]);
>>>>>>> feature/quiz-certifications
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
<<<<<<< HEAD
        const fetchCourses = async () => {
            try {
                const response = await api.get('/courses');
                setCourses(response.data.data);
            } catch (error) {
                console.error("Failed to fetch courses", error);
=======
        const fetchData = async () => {
            try {
                const [coursesRes, certsRes] = await Promise.all([
                    api.get('/courses'),
                    api.get('/certificates')
                ]);
                setCourses(coursesRes.data.data);
                setCertificates(certsRes.data.data);
            } catch (error) {
                console.error("Failed to fetch data", error);
>>>>>>> feature/quiz-certifications
            } finally {
                setLoading(false);
            }
        };
<<<<<<< HEAD
        fetchCourses();
=======
        fetchData();
>>>>>>> feature/quiz-certifications
    }, []);

    const getIcon = (id) => {
        switch (id) {
            case 'electrical': return <Zap className="w-8 h-8 text-yellow-500" />;
            case 'plumbing': return <Wrench className="w-8 h-8 text-blue-500" />;
            case 'english': return <Languages className="w-8 h-8 text-red-500" />;
            case 'computer': return <Monitor className="w-8 h-8 text-green-500" />;
            default: return <BookOpen className="w-8 h-8 text-purple-500" />;
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
<<<<<<< HEAD
                <header className="mb-16 text-center">
                    <div className="inline-block p-3 rounded-full bg-blue-900/30 mb-4 border border-blue-500/30">
                        <BookOpen className="w-10 h-10 text-blue-400" />
                    </div>
                    <h1 className="text-4xl font-bold text-white mb-4">
                        Available Courses
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Browse our library of trade skills and start learning today.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
=======
                <header className="mb-12 text-center">
                    <div className="inline-block p-3 rounded-full bg-blue-900/30 mb-4 border border-blue-500/30">
                        <GraduationCap className="w-10 h-10 text-blue-400" />
                    </div>
                    <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent mb-4">
                        UpCraft Skills Academy
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Select a trade or skill to begin your journey. Complete all lessons to unlock the certification quiz.
                    </p>
                </header>

                {/* MY CERTIFICATES SECTION */}
                {certificates.length > 0 && (
                    <div className="mb-16">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <GraduationCap className="text-yellow-400" /> My Certificates
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {certificates.map((cert) => (
                                <div key={cert.id} className="bg-gray-900 border border-gray-800 p-6 rounded-xl flex items-center justify-between hover:border-yellow-500/50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-blue-900/20 rounded-full flex items-center justify-center text-blue-400">
                                            <GraduationCap size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg text-white">{cert.courseName}</h4>
                                            <p className="text-sm text-gray-500">Earned on {new Date(cert.date).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => navigate(`/course/${cert.courseId}/certificate`)}
                                        className="text-sm text-blue-400 hover:text-blue-300 font-medium px-4 py-2 hover:bg-blue-900/20 rounded-lg transition-colors"
                                    >
                                        View
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <h2 className="text-2xl font-bold mb-6 text-gray-200">Available Courses</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
>>>>>>> feature/quiz-certifications
                    {courses.map((course) => (
                        <div
                            key={course.id}
                            onClick={() => navigate(`/course/${course.id}`)}
<<<<<<< HEAD
                            className="group relative bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 cursor-pointer flex flex-col h-full"
                        >
                            {/* Image Section */}
                            <div className="relative h-48 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent z-10 opacity-60"></div>
                                <img
                                    src={course.thumbnail}
                                    alt={course.title}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                                />
                                {/* Category Icon Badge */}
                                <div className="absolute top-3 right-3 z-20">
                                    <div className="bg-gray-950/40 backdrop-blur-md border border-white/10 p-2 rounded-xl shadow-lg ring-1 ring-white/5">
                                        {React.cloneElement(getIcon(course.id), { className: getIcon(course.id).props.className.replace('w-8 h-8', 'w-5 h-5') })}
                                    </div>
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="p-6 flex flex-col flex-grow relative">
                                <h3 className="text-xl font-bold text-white mb-3 mt-2 group-hover:text-blue-400 transition-colors">
                                    {course.title}
                                </h3>

                                <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 mb-8 flex-grow">
                                    {course.description}
                                </p>

                                <button
                                    className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-900/40 hover:shadow-blue-500/40 transition-all duration-300 transform group-hover:scale-[1.02] flex items-center justify-center gap-2 tracking-wide"
                                >
                                    START LEARNING
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </button>
=======
                            className="group bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-900/20 transition-all duration-300 cursor-pointer flex flex-col"
                        >
                            <div className="h-40 overflow-hidden relative">
                                <img
                                    src={course.thumbnail}
                                    alt={course.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md p-2 rounded-lg border border-white/10">
                                    {getIcon(course.id)}
                                </div>
                            </div>

                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-xl font-bold text-gray-100 mb-2 group-hover:text-blue-400 transition-colors">
                                    {course.title}
                                </h3>
                                <p className="text-sm text-gray-400 line-clamp-2 mb-6 flex-grow">
                                    {course.description}
                                </p>

                                <div className="flex items-center justify-between text-xs text-gray-500 border-t border-gray-800 pt-4">
                                    <span>{course.lessons.length} Lessons</span>
                                    <span className="group-hover:translate-x-1 transition-transform text-blue-400 font-medium">Start Learning →</span>
                                </div>
>>>>>>> feature/quiz-certifications
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CourseList;
