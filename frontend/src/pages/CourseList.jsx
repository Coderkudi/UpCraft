import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { BookOpen, GraduationCap, Zap, Wrench, Languages, Monitor } from 'lucide-react';

const CourseList = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await api.get('/courses');
                setCourses(response.data.data);
            } catch (error) {
                console.error("Failed to fetch courses", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {courses.map((course) => (
                        <div
                            key={course.id}
                            onClick={() => navigate(`/course/${course.id}`)}
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
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CourseList;
