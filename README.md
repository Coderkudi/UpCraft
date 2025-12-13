# UpCraft

# 🛠️ UpCraft

UpCraft is a platform that empowers workers to **learn new skills**, **showcase their craft**, and **earn certifications** through practical training and assessments.
It bridges the gap between **skilled workers** and **real-world opportunities**, offering a structured path for growth.

---

## 🚀 Project Overview

### 🎯 Purpose

- Help workers upskill through short video-based courses.
- Provide small quizzes after each course to evaluate learning.
- Generate **digital certificates** for those who pass.
- Allow users to maintain a verified **profile dashboard** that can be shared with employers.

---

## 🧩 Folder Structure

UpCraft/
│
├── backend/ # Node.js + Express + MongoDB API
│ ├── config/ # Database connection and configs
│ ├── controllers/ # Core logic (auth, users, courses, quiz, etc.)
│ ├── middleware/ # Auth, error handling, validation
│ ├── models/ # MongoDB schemas
│ ├── routes/ # Express route files
│ ├── utils/ # Helper functions (JWT, email, cert generator)
│ ├── .env # Environment variables
│ ├── package.json
│ └── server.js # Entry point
│
├── frontend/ # React + Tailwind client app
│ ├── public/
│ ├── src/
│ │ ├── components/ # Reusable UI elements (Navbar, Footer, Cards)
│ │ ├── pages/ # Page components (Login, Dashboard, Courses, etc.)
│ │ ├── context/ # Auth context for state management
│ │ ├── utils/ # Axios setup and helper functions
│ │ ├── styles/ # Global styles and Tailwind config
│ │ └── App.jsx # Routing setup
│ ├── package.json
│ └── vite.config.js
│
├── .gitignore
└── README.md

---

## 👥 Team Division

| Member                     | Role                      | Responsibilities                                                                                     |
| -------------------------- | ------------------------- | ---------------------------------------------------------------------------------------------------- |
| **Team Lead - Rimmi**      | Authentication & Profile  | Build user signup/login, JWT auth, profile update system (backend) and related frontend forms/pages. |
| **Teammate 2 - Shriparna** | Courses Module            | Manage course & lesson creation, enrollment, and course display frontend.                            |
| **Teammate 3 - Ananya**    | Quiz & Certificate Module | Handle quizzes, results evaluation, and digital certificate generation with frontend integration.    |

All three members will contribute equally to **frontend** and **backend**, as the project is evaluated in both subjects.

---

## ⚙️ Tech Stack

| Category            | Technologies                                |
| ------------------- | ------------------------------------------- |
| **Frontend**        | React.js, Tailwind CSS, Axios, React Router |
| **Backend**         | Node.js, Express.js, MongoDB (Mongoose)     |
| **Authentication**  | JWT (JSON Web Tokens)                       |
| **Version Control** | Git & GitHub                                |
| **Tools**           | VS Code, Postman, Vite                      |

---

## 🧠 Example User Flow

1. Worker signs up using email or phone number.
2. Fills out their skill profile (e.g., Electrical, Carpentry).
3. Browses courses and enrolls in one (e.g., _Basic Electrical Safety_).
4. Watches training videos and completes lessons.
5. Takes a small quiz after finishing.
6. Upon passing, receives a **digital certificate**.
7. Can view or share the certificate from their dashboard.

---

## ⚡ Getting Started

### Clone the Repository

```bash
git clone https://github.com/<your-username>/UpCraft.git
cd UpCraft
```
