import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import YouTubePlayer from '../components/YouTubePlayer';
import { ArrowLeft } from 'lucide-react';

const Lesson = () => {
    const { courseId, lessonId } = useParams();
    const navigate = useNavigate();
    const [lesson, setLesson] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLesson = async () => {
            try {
                const response = await api.get(`/courses/${courseId}/lessons`);
                const found = response.data.data.find(l => l._id === lessonId);
                if (found) {
                    setLesson(found);
                } else {
                    navigate(`/course/${courseId}`);
                }
            } catch (error) {
                console.error("Error fetching lesson", error);
            } finally {
                setLoading(false);
            }
        };
        fetchLesson();
    }, [courseId, lessonId, navigate]);

    const handleLessonComplete = async () => {
        try {
            await api.post(`/lessons/${lessonId}/complete`);

            // Update local storage for THIS COURSE
            const key = `completed_${courseId}`;
            const stored = JSON.parse(localStorage.getItem(key) || '[]');
            if (!stored.includes(lessonId)) {
                localStorage.setItem(key, JSON.stringify([...stored, lessonId]));
            }

            navigate(`/course/${courseId}`);
        } catch (error) {
            console.error("Failed to complete lesson", error);
        }
    };

    const getVideoId = (url) => {
        if (!url) return '';
        try {
            const urlObj = new URL(url);
            if (urlObj.hostname.includes('youtube.com')) {
                return urlObj.searchParams.get('v');
            } else if (urlObj.hostname.includes('youtu.be')) {
                return urlObj.pathname.slice(1);
            }
            return '';
        } catch (e) {
            console.error("Invalid video URL", url);
            return '';
        }
    };

    if (loading || !lesson) return <div className="text-white text-center mt-20">Loading Lesson...</div>;

    const videoId = getVideoId(lesson.videoUrl);

    return (
        <div className="min-h-screen bg-gray-950 text-white p-6 md:p-12 font-sans">
            <div className="max-w-5xl mx-auto">
                <button
                    onClick={() => navigate(`/course/${courseId}`)}
                    className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
                >
                    <ArrowLeft size={20} /> Back to Lesson List
                </button>

                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <div className="mb-6">
                            <h1 className="text-3xl font-bold mb-2">{lesson.title}</h1>
                            <span className="bg-blue-900/50 text-blue-300 px-3 py-1 rounded-full text-sm font-medium">
                                Video Lesson
                            </span>
                        </div>

                        {videoId ? (
                            <YouTubePlayer videoId={videoId} onEnd={handleLessonComplete} />
                        ) : (
                            <div className="aspect-video bg-gray-800 flex items-center justify-center rounded-xl">Video Unavailable</div>
                        )}
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 sticky top-6">
                            <h3 className="font-bold text-lg mb-4 text-gray-200">Instructions</h3>
                            <p className="text-gray-400 text-sm mb-6">
                                Watch the entire video to automatically mark this lesson as complete.
                            </p>

                            <button
                                onClick={handleLessonComplete}
                                className="w-full py-3 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-medium transition-colors border border-gray-700"
                            >
                                Skip to End (Dev Only)
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Lesson;

