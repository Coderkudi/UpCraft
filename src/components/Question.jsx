import React from 'react';

const Question = ({ question, index, total, selectedOption, onSelect }) => {
    return (
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
                <span className="text-gray-400 font-medium text-sm">Question {index + 1} of {total}</span>
                <span className="bg-blue-900/40 text-blue-300 text-xs px-2 py-1 rounded">Single Selection</span>
            </div>

            <h3 className="text-2xl font-bold text-white mb-8">{question.questionText}</h3>

            <div className="grid gap-4">
                {question.options.map((option, idx) => (
                    <button
                        key={idx}
                        onClick={() => onSelect(option)}
                        className={`w-full text-left p-6 rounded-xl border transition-all duration-200 flex items-center justify-between group
              ${selectedOption === option
                                ? 'bg-blue-600/20 border-blue-500 shadow-blue-900/20 shadow-lg'
                                : 'bg-gray-800/50 border-gray-700 hover:bg-gray-800 hover:border-gray-500'
                            }`}
                    >
                        <span className={`text-lg transition-colors ${selectedOption === option ? 'text-blue-300 font-medium' : 'text-gray-300'}`}>
                            {option.text}
                        </span>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
                ${selectedOption === option ? 'border-blue-400 bg-blue-500' : 'border-gray-600 group-hover:border-gray-400'}`}>
                            {selectedOption === option && <div className="w-2 h-2 rounded-full bg-white" />}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Question;
