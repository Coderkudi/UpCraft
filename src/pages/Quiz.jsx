import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axios';
import Question from '../components/Question';
import { Trophy, AlertCircle, RefreshCw, CheckCircle, ArrowLeft } from 'lucide-react';

const Quiz = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState(null);
    const [loading, setLoading] = useState(true);
    const [answers, setAnswers] = useState({});
    const [result, setResult] = useState(null);
    const [submitting, setSubmitting] = useState(false);

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

    const handleOptionSelect = (questionIndex, option) => {
        setAnswers(prev => ({
            ...prev,
            [questionIndex]: option
        }));
    };

    const handleSubmit = async () => {
        setSubmitting(true);
        try {
            const response = await api.post(`/courses/${courseId}/quiz/submit`, {
                answers
            });
            setResult(response.data);
        } catch (error) {
            console.error("Quiz submission failed", error);
            alert("Failed to submit quiz. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div className="text-white text-center mt-20">Loading Quiz...</div>;

    if (!quiz) return <div className="text-white text-center mt-20">Quiz not found for this course.</div>;

    if (result) {
        return (
            <div className="min-h-screen bg-gray-950 text-white p-6 flex flex-col items-center justify-center font-sans">
                <div className={`max-w-xl w-full p-8 rounded-2xl border ${result.passed ? 'bg-green-900/20 border-green-500/50' : 'bg-red-900/20 border-red-500/50'} text-center shadow-2xl`}>
                    {result.passed ? (
                        <div className="animate-fade-in-up">
                            <Trophy className="w-20 h-20 text-yellow-400 mx-auto mb-6" />
                            <h2 className="text-4xl font-extrabold mb-2 text-white">Congratulations!</h2>
                            <p className="text-xl text-green-300 mb-2">You Passed!</p>
                            <div className="text-5xl font-black text-white mb-6">
                                {Math.round(result.percentage)}%
                            </div>
                            <p className="text-gray-400 mb-8">
                                You answered {result.score} out of {result.total} questions correctly.
                            </p>
                            <button
                                onClick={() => navigate(`/course/${courseId}/certificate`)}
                                className="px-8 py-4 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-green-900/40 transition-all transform hover:scale-105"
                            >
                                Get Your Certificate
                            </button>
                        </div>
                    ) : (
                        <div className="animate-fade-in-up">
                            <AlertCircle className="w-20 h-20 text-red-500 mx-auto mb-6" />
                            <h2 className="text-3xl font-bold mb-2 text-white">Quiz Failed</h2>
                            <div className="text-4xl font-black text-red-400 mb-2">
                                {Math.round(result.percentage)}%
                            </div>
                            <p className="text-gray-300 mb-6 font-medium">
                                You need 50% to pass. You scored {result.score}/{result.total}.
                            </p>
                            <button
                                onClick={() => window.location.reload()}
                                className="px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white rounded-xl font-bold text-lg border border-gray-600 transition-all flex items-center gap-2 mx-auto"
                            >
                                <RefreshCw size={20} /> Try Again
                            </button>
                        </div>
                    )}

                    <button
                        onClick={() => navigate('/')}
                        className="mt-8 text-gray-500 hover:text-white underline text-sm"
                    >
                        Back to Courses
                    </button>
                </div>
            </div>
        );
    }

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

                <Question
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

export default Quiz;
