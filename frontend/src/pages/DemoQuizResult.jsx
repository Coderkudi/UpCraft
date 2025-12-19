import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Trophy, AlertCircle, RefreshCw, Loader2 } from 'lucide-react';

const DemoQuizResult = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { courseId } = useParams();
    const [submitting, setSubmitting] = useState(false);

    // Data passed from DemoQuiz.jsx
    const { score, total, percentage, passed, courseTitle } = location.state || {};

    // Prevent direct access
    if (score === undefined) {
        return (
            <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center">
                <p className="mb-4">No quiz result found. Please take the quiz first.</p>
                <button
                    onClick={() => navigate(`/course/${courseId}/quiz`)}
                    className="underline text-blue-400"
                >
                    Go to Quiz
                </button>
            </div>
        );
    }

    const handleGenerateCertificate = async () => {
        setSubmitting(true);
        try {
            const payload = {
                userId: "demo_user_123",              // demo user
                courseId: courseId,
                courseTitle: courseTitle || "Course Completion",
                userName: "Demo Learner",
                score: percentage
            };

            // DEMO MODE: navigate directly to viewer (Bypassing API for pure frontend demo)
            navigate(`/course/${courseId}/certificate`, {
                state: {
                    previewData: payload,
                    certificateData: {
                        issuedAt: new Date().toISOString()
                    }
                }
            });
        } catch (error) {
            console.error("Certificate generation failed", error);
            alert("Failed to generate certificate.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-950 text-white p-6 flex items-center justify-center font-sans">
            <div
                className={`max-w-xl w-full p-8 rounded-2xl border text-center shadow-2xl
                ${passed
                        ? 'bg-green-900/20 border-green-500/50'
                        : 'bg-red-900/20 border-red-500/50'}`}
            >
                {passed ? (
                    <>
                        <Trophy className="w-20 h-20 text-yellow-400 mx-auto mb-6" />
                        <h2 className="text-4xl font-extrabold mb-2">Congratulations!</h2>
                        <p className="text-xl text-green-300 mb-2">You Passed</p>

                        <div className="text-5xl font-black mb-6">
                            {Math.round(percentage)}%
                        </div>

                        <p className="text-gray-400 mb-8">
                            You answered {score} out of {total} questions correctly.
                        </p>

                        <button
                            onClick={handleGenerateCertificate}
                            disabled={submitting}
                            className="px-8 py-4 bg-green-600 hover:bg-green-500 rounded-xl font-bold text-lg
                                       shadow-lg hover:shadow-green-900/40 transition-all transform hover:scale-105
                                       flex items-center justify-center gap-2 mx-auto disabled:opacity-70"
                        >
                            {submitting && <Loader2 className="animate-spin" />}
                            Generate Certificate
                        </button>
                    </>
                ) : (
                    <>
                        <AlertCircle className="w-20 h-20 text-red-500 mx-auto mb-6" />
                        <h2 className="text-3xl font-bold mb-2">Quiz Failed</h2>

                        <div className="text-4xl font-black text-red-400 mb-4">
                            {Math.round(percentage)}%
                        </div>

                        <p className="text-gray-300 mb-6">
                            You need at least 50% to pass.
                        </p>

                        <button
                            onClick={() => navigate(`/course/${courseId}/quiz`)}
                            className="px-8 py-4 bg-gray-800 hover:bg-gray-700 rounded-xl font-bold
                                       border border-gray-600 flex items-center gap-2 mx-auto"
                        >
                            <RefreshCw size={20} /> Retake Quiz
                        </button>
                    </>
                )}

                <button
                    onClick={() => navigate('/')}
                    className="mt-8 text-gray-500 hover:text-white underline text-sm block mx-auto"
                >
                    Back to Courses
                </button>
            </div>
        </div>
    );
};

export default DemoQuizResult;
