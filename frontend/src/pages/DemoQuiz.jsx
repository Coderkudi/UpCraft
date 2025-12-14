import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axiosmock';
import DemoQuestion from '../components/DemoQuestion';
import { Trophy, AlertCircle, RefreshCw, CheckCircle, ArrowLeft, Loader2 } from 'lucide-react';

const DemoQuiz = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState(null);
    const [loading, setLoading] = useState(true);
    const [answers, setAnswers] = useState({});
    const [result, setResult] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await api.get(`/courses/${courseId}/quiz`);
                setQuiz(response.data.data);
            } catch (error) {
                console.error("Failed to fetch quiz", error);
            } finally {
                setLoading(false);
            }
        };
        fetchQuiz();
    }, [courseId]);

    const handleSelectOption = (option) => {
        setAnswers(prev => ({
            ...prev,
            [currentQuestionIndex]: option
        }));
    };

    const handleNext = () => {
        if (currentQuestionIndex < quiz.questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        }
    };

    const handleSubmit = async () => {
        setSubmitting(true);
        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 500));

        let score = 0;
        const total = quiz.questions.length;

        quiz.questions.forEach((q, idx) => {
            const userAns = answers[idx];
            // Find correct option in q.options
            // Note: In demoData, options have 'isCorrect' boolean.
            // But answers[idx] stores the *selected option object*.
            // So we check if answers[idx].isCorrect is true.
            if (userAns && userAns.isCorrect) {
                score++;
            }
        });

        const percentage = (score / total) * 100;
        const passed = percentage >= 50;

        setSubmitting(false);

        // Navigate to Result Page
        navigate(`/course/${courseId}/quiz/result`, {
            state: {
                score,
                total,
                percentage,
                passed,
                courseId,
                courseTitle: quiz.title.replace(' Final Quiz', '') // Heuristic cleanup
            }
        });
    };

    if (loading) return <div className="text-white text-center mt-20">Loading Quiz...</div>;

    if (!quiz) return <div className="text-white text-center mt-20">Quiz not found for this course.</div>;

    // REMOVED INLINE RESULT RENDERING
    // Logic moved to DemoQuizResult.jsx

    const currentQuestion = quiz.questions[currentQuestionIndex];
    const isFirst = currentQuestionIndex === 0;
    const isLast = currentQuestionIndex === quiz.questions.length - 1;
    const hasAnsweredCurrent = answers[currentQuestionIndex] !== undefined;
    const allAnswered = quiz.questions.every((_, idx) => answers[idx] !== undefined);

    return (
        <div className="min-h-screen bg-gray-950 text-white p-6 font-sans flex flex-col items-center">
            <div className="w-full max-w-2xl mt-12">
                <header className="flex items-center justify-between mb-8">
                    <button onClick={() => navigate('/')} className="text-gray-500 hover:text-white transition-colors">Abort Quiz</button>
                    <div className="text-gray-400 font-mono text-sm">Timer: --:--</div>
                </header>

                <div className="w-full h-2 bg-gray-900 rounded-full mb-12 overflow-hidden">
                    <div
                        className="h-full bg-blue-500 transition-all duration-500 ease-out"
                        style={{ width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}
                    />
                </div>

                <DemoQuestion
                    question={currentQuestion}
                    index={currentQuestionIndex}
                    total={quiz.questions.length}
                    selectedOption={answers[currentQuestionIndex]}
                    onSelect={handleSelectOption}
                />

                <div className="mt-8 flex items-center justify-between">
                    <button
                        onClick={handlePrevious}
                        disabled={isFirst}
                        className={`px-6 py-3 rounded-xl font-medium transition-colors ${isFirst ? 'text-gray-700 cursor-not-allowed' : 'text-gray-300 hover:text-white hover:bg-gray-900'}`}
                    >
                        Previous
                    </button>

                    {isLast ? (
                        <button
                            onClick={handleSubmit}
                            disabled={!allAnswered || submitting}
                            className={`px-8 py-3 rounded-xl font-bold transition-all shadow-lg flex items-center gap-2
                             ${!allAnswered
                                    ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                                    : 'bg-blue-600 hover:bg-blue-500 text-white hover:scale-105 shadow-blue-900/30'}`}
                        >
                            {submitting && <Loader2 className="animate-spin w-4 h-4" />}
                            Submit Quiz
                        </button>
                    ) : (
                        <button
                            onClick={handleNext}
                            disabled={!hasAnsweredCurrent}
                            className={`px-8 py-3 rounded-xl font-bold transition-all
                            ${!hasAnsweredCurrent
                                    ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                                    : 'bg-gray-100 text-gray-950 hover:bg-white hover:scale-105'}`}
                        >
                            Next Question
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DemoQuiz;
