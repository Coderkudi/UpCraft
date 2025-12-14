// MOCK DATA STORE
// In a real app, this would be in a MongoDB database.

export const courses = {
    // 1. ELECTRICAL
    "electrical": {
        id: "electrical",
        title: "Electrical Wiring Basics",
        description: "Master the fundamentals of residential electrical systems, safety, and wiring.",
        thumbnail: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2669&auto=format&fit=crop",
        lessons: [
            { _id: "e1", title: "Electrical Safety First", videoUrl: "https://www.youtube.com/watch?v=UZh42Yt5M-Q", duration: "10:00", completed: false },
            { _id: "e2", title: "Understanding Circuits", videoUrl: "https://www.youtube.com/watch?v=HoLPK6q80Dk", duration: "15:30", completed: false },
            { _id: "e3", title: "Wiring a Switch", videoUrl: "https://www.youtube.com/watch?v=Xh0YcIq4e2A", duration: "12:45", completed: false }
        ],
        quiz: {
            _id: "quiz_electrical",
            title: "Electrical Safety Quiz",
            questions: [
                {
                    _id: "q1",
                    questionText: "What is the main purpose of residential electrical wiring in a house?",
                    options: [
                        { text: "To decorate the walls", isCorrect: false },
                        { text: "To distribute electrical power safely to outlets and appliances", isCorrect: true },
                        { text: "To keep the house warm", isCorrect: false },
                        { text: "To reduce electricity bills", isCorrect: false }
                    ]
                },
                {
                    _id: "q2",
                    questionText: "Which two wires normally carry current in a basic home circuit?",
                    options: [
                        { text: "Live (hot) and neutral", isCorrect: true },
                        { text: "Live (hot) and earth", isCorrect: false },
                        { text: "Neutral and earth", isCorrect: false },
                        { text: "Phase and shield", isCorrect: false }
                    ]
                },
                {
                    _id: "q3",
                    questionText: "Why is grounding (earthing) important in a residential electrical system?",
                    options: [
                        { text: "It makes lights brighter", isCorrect: false },
                        { text: "It reduces the electricity bill", isCorrect: false },
                        { text: "It provides a safe path for fault current and helps prevent electric shock", isCorrect: true },
                        { text: "It increases the voltage in the circuit", isCorrect: false }
                    ]
                },
                {
                    _id: "q4",
                    questionText: "What is the role of the main service panel (breaker box) in a home?",
                    options: [
                        { text: "To store extra wires", isCorrect: false },
                        { text: "To convert AC power to DC", isCorrect: false },
                        { text: "To distribute power to different circuits and protect them with breakers or fuses", isCorrect: true },
                        { text: "To measure electricity usage for billing", isCorrect: false }
                    ]
                },
                {
                    _id: "q5",
                    questionText: "Why should power always be turned off at the main breaker before doing any wiring work?",
                    options: [
                        { text: "To save time during work", isCorrect: false },
                        { text: "To keep tools from overheating", isCorrect: false },
                        { text: "To avoid electric shock and reduce the risk of fire while working on the circuit", isCorrect: true },
                        { text: "To make wires easier to see", isCorrect: false }
                    ]
                }
            ]
        }
    },

    // 2. PLUMBING
    "plumbing": {
        id: "plumbing",
        title: "Plumbing Essentials",
        description: "Learn to fix leaks, install pipes, and understand drainage systems.",
        thumbnail: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?q=80&w=2670&auto=format&fit=crop",
        lessons: [
            { _id: "p1", title: "Tools of the Trade", videoUrl: "https://www.youtube.com/watch?v=y3nLh_CqG8c", duration: "08:00", completed: false },
            { _id: "p2", title: "Fixing a Leaky Faucet", videoUrl: "https://www.youtube.com/watch?v=FfkI1aFX1Pw", duration: "12:00", completed: false },
            { _id: "p3", title: "PVC Pipe Joining", videoUrl: "https://www.youtube.com/watch?v=ka9o0yL0g8k", duration: "14:20", completed: false }
        ],
        quiz: {
            _id: "quiz_plumbing",
            title: "Plumbing Basics Quiz",
            questions: [
                {
                    _id: "q1",
                    questionText: "What is the main purpose of a plumbing system in a building?",
                    options: [
                        { text: "To cool the rooms", isCorrect: false },
                        { text: "To supply fresh water and remove wastewater safely", isCorrect: true },
                        { text: "To provide electricity", isCorrect: false },
                        { text: "To support the structure", isCorrect: false }
                    ]
                },
                {
                    _id: "q2",
                    questionText: "Which of the following is a main component of a residential plumbing system?",
                    options: [
                        { text: "Water supply system", isCorrect: true },
                        { text: "Lighting system", isCorrect: false },
                        { text: "Air conditioning unit", isCorrect: false },
                        { text: "Solar panel", isCorrect: false }
                    ]
                },
                {
                    _id: "q3",
                    questionText: "What is the function of a trap under a sink?",
                    options: [
                        { text: "To increase water pressure", isCorrect: false },
                        { text: "To store extra water", isCorrect: false },
                        { text: "To hold water and prevent sewer gases from entering the room", isCorrect: true },
                        { text: "To filter drinking water", isCorrect: false }
                    ]
                },
                {
                    _id: "q4",
                    questionText: "Why are vent pipes important in a plumbing system?",
                    options: [
                        { text: "They supply hot water", isCorrect: false },
                        { text: "They allow air into the system to maintain pressure and help drainage", isCorrect: true },
                        { text: "They store wastewater", isCorrect: false },
                        { text: "They cool the pipes", isCorrect: false }
                    ]
                },
                {
                    _id: "q5",
                    questionText: "Which of the following is commonly used as a piping material in water supply lines?",
                    options: [
                        { text: "Glass", isCorrect: false },
                        { text: "Wood", isCorrect: false },
                        { text: "Copper or PVC", isCorrect: true },
                        { text: "Rubber", isCorrect: false }
                    ]
                }
            ]
        }
    },

    // 3. ENGLISH LANGUAGE
    "english": {
        id: "english",
        title: "Professional English",
        description: "Improve your workplace communication and grammar skills.",
        thumbnail: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2670&auto=format&fit=crop",
        lessons: [
            { _id: "eng1", title: "Business Greetings", videoUrl: "https://www.youtube.com/watch?v=k82a_q6fbeI", duration: "05:00", completed: false },
            { _id: "eng2", title: "Email Etiquette", videoUrl: "https://www.youtube.com/watch?v=7uV5a8e3zSc", duration: "11:00", completed: false },
            { _id: "eng3", title: "Common Grammar Mistakes", videoUrl: "https://www.youtube.com/watch?v=5yH_c97k4vQ", duration: "13:45", completed: false }
        ],
        quiz: {
            _id: "quiz_english",
            title: "English Proficiency Quiz",
            questions: [
                {
                    _id: "q1",
                    questionText: "Which sentence is correct?",
                    options: [
                        { text: "He go to work yesterday.", isCorrect: false },
                        { text: "He went to work yesterday.", isCorrect: true },
                        { text: "He gone to work yesterday.", isCorrect: false },
                        { text: "He going to work yesterday.", isCorrect: false }
                    ]
                },
                {
                    _id: "q2",
                    questionText: "Choose the formal greeting:",
                    options: [
                        { text: "Hey", isCorrect: false },
                        { text: "Dear Mr. Smith,", isCorrect: true },
                        { text: "What's up?", isCorrect: false },
                        { text: "Hiya", isCorrect: false }
                    ]
                },
                {
                    _id: "q3",
                    questionText: "What is the past tense of 'run'?",
                    options: [
                        { text: "Runned", isCorrect: false },
                        { text: "Run", isCorrect: false },
                        { text: "Ran", isCorrect: true },
                        { text: "Running", isCorrect: false }
                    ]
                },
                {
                    _id: "q4",
                    questionText: "Correct the sentence: 'She don't like coffee.'",
                    options: [
                        { text: "She doesn't like coffee.", isCorrect: true },
                        { text: "She not like coffee.", isCorrect: false },
                        { text: "She no like coffee.", isCorrect: false },
                        { text: "She don't likes coffee.", isCorrect: false }
                    ]
                },
                {
                    _id: "q5",
                    questionText: "Subject line for a job application email:",
                    options: [
                        { text: "Job", isCorrect: false },
                        { text: "Hello", isCorrect: false },
                        { text: "Application for [Role] - [Name]", isCorrect: true },
                        { text: "I want work", isCorrect: false }
                    ]
                }
            ]
        }
    },

    // 4. COMPUTER SKILLS
    "computer": {
        id: "computer",
        title: "Computer Literacy",
        description: "Basics of MS Office, Email, and Internet Browsing.",
        thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2670&auto=format&fit=crop",
        lessons: [
            { _id: "comp1", title: "Understanding Hardware", videoUrl: "https://www.youtube.com/watch?v=xnYzS_8qMHA", duration: "09:00", completed: false },
            { _id: "comp2", title: "Microsoft Word Basics", videoUrl: "https://www.youtube.com/watch?v=S-nHYzK-BVg", duration: "18:00", completed: false },
            { _id: "comp3", title: "Internet Safety", videoUrl: "https://www.youtube.com/watch?v=yrln8nyVBLU", duration: "10:30", completed: false }
        ],
        quiz: {
            _id: "quiz_computer",
            title: "Computer Skills Quiz",
            questions: [
                {
                    _id: "q1",
                    questionText: "Which software in MS Office is mainly used for creating text documents like letters and reports?",
                    options: [
                        { text: "MS PowerPoint", isCorrect: false },
                        { text: "MS Excel", isCorrect: false },
                        { text: "MS Word", isCorrect: true },
                        { text: "MS Access", isCorrect: false }
                    ]
                },
                {
                    _id: "q2",
                    questionText: "Which MS Office application is best suited for calculations and data analysis in tabular form?",
                    options: [
                        { text: "MS Word", isCorrect: false },
                        { text: "MS Excel", isCorrect: true },
                        { text: "MS PowerPoint", isCorrect: false },
                        { text: "MS Outlook", isCorrect: false }
                    ]
                },
                {
                    _id: "q3",
                    questionText: "What is the primary purpose of an email?",
                    options: [
                        { text: "To edit photos", isCorrect: false },
                        { text: "To exchange electronic messages over the internet", isCorrect: true },
                        { text: "To design websites", isCorrect: false },
                        { text: "To install software", isCorrect: false }
                    ]
                },
                {
                    _id: "q4",
                    questionText: "Which of the following is a web browser used for internet browsing?",
                    options: [
                        { text: "MS Word", isCorrect: false },
                        { text: "Google Chrome", isCorrect: true },
                        { text: "MS Excel", isCorrect: false },
                        { text: "PowerPoint", isCorrect: false }
                    ]
                },
                {
                    _id: "q5",
                    questionText: "In a web browser, where do you type a website address (URL)?",
                    options: [
                        { text: "Status bar", isCorrect: false },
                        { text: "Taskbar", isCorrect: false },
                        { text: "Address bar", isCorrect: true },
                        { text: "Title bar", isCorrect: false }
                    ]
                }
            ]
        }
    }
};
