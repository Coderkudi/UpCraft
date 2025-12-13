import React from 'react';
import { User, Mail, Award, Book, Clock } from 'lucide-react';

const Profile = () => {
    // Mock user data
    const user = {
        name: "Anush",
        email: "anush@example.com",
        role: "Student",
        joinDate: "December 2025"
    };

    return (
        <div className="min-h-screen bg-gray-950 text-white p-8 font-sans">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-8 mb-8 border border-gray-700 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>

                    <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8 relative z-10">
                        <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-3xl font-bold text-white shadow-xl ring-4 ring-gray-800">
                            {user.name.charAt(0)}
                        </div>
                        <div className="text-center md:text-left">
                            <h1 className="text-3xl font-bold text-white mb-2">{user.name}</h1>
                            <div className="flex items-center justify-center md:justify-start space-x-4 text-gray-400">
                                <span className="flex items-center"><User className="w-4 h-4 mr-1" /> {user.role}</span>
                                <span className="flex items-center"><Mail className="w-4 h-4 mr-1" /> {user.email}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-gray-900/50 p-6 rounded-2xl border border-gray-800 flex items-center space-x-4">
                        <div className="p-3 bg-blue-900/20 rounded-xl">
                            <Book className="w-6 h-6 text-blue-400" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-white">4</div>
                            <div className="text-sm text-gray-400">Available Courses</div>
                        </div>
                    </div>
                    <div className="bg-gray-900/50 p-6 rounded-2xl border border-gray-800 flex items-center space-x-4">
                        <div className="p-3 bg-green-900/20 rounded-xl">
                            <Award className="w-6 h-6 text-green-400" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-white">0</div>
                            <div className="text-sm text-gray-400">Certificates Earned</div>
                        </div>
                    </div>
                    <div className="bg-gray-900/50 p-6 rounded-2xl border border-gray-800 flex items-center space-x-4">
                        <div className="p-3 bg-purple-900/20 rounded-xl">
                            <Clock className="w-6 h-6 text-purple-400" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-white">0h</div>
                            <div className="text-sm text-gray-400">Learning Time</div>
                        </div>
                    </div>
                </div>

                {/* Recent Activity / Achievements Empty State */}
                <div className="bg-gray-900/30 rounded-3xl p-8 border border-gray-800 text-center">
                    <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Award className="w-8 h-8 text-gray-600" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">No Certificates Yet</h3>
                    <p className="text-gray-400 max-w-md mx-auto mb-6">
                        Complete lessons and pass quizzes to earn your professional certificates. Your achievements will appear here.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Profile;
