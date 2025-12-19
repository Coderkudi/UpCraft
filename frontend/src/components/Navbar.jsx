import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { GraduationCap, Home, User, BookOpen } from "lucide-react";

export default function Navbar() {
  const { accessToken, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path) =>
    location.pathname === path
      ? "text-blue-400 bg-blue-500/10"
      : "text-gray-400 hover:text-white hover:bg-gray-800";

  return (
    <nav className="w-full border-b border-gray-800 bg-[#0f0f0f] text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="p-2 rounded-lg bg-blue-900/20 group-hover:bg-blue-900/40 transition">
            <GraduationCap className="w-6 h-6 text-blue-400" />
          </div>
          <span className="text-2xl font-bold text-blue-400">UpCraft</span>
        </Link>

        {/* Right section */}
        <div className="flex items-center gap-2">
          {!accessToken && (
            <>
              <Link
                to="/login"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${isActive(
                  "/login"
                )}`}
              >
                Login
              </Link>

              <Link
                to="/register"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${isActive(
                  "/register"
                )}`}
              >
                Register
              </Link>
            </>
          )}

          {accessToken && (
            <>
              <Link
                to="/"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${isActive(
                  "/"
                )}`}
              >
                <Home className="w-4 h-4" />
                Home
              </Link>

              <Link
                to="/courses"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${isActive(
                  "/courses"
                )}`}
              >
                <BookOpen className="w-4 h-4" />
                Courses
              </Link>

              <Link
                to="/profile"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${isActive(
                  "/profile"
                )}`}
              >
                <User className="w-4 h-4" />
                Profile
              </Link>

              <button
                onClick={handleLogout}
                className="ml-2 px-3 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
