import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { GraduationCap, Home, User, BookOpen, LogOut } from "lucide-react";

export default function Navbar() {
  const { accessToken, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path) =>
    location.pathname === path
      ? "text-blue-400 bg-blue-500/15"
      : "text-gray-400 hover:text-white hover:bg-gray-800/60";

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-gray-950/70 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="p-2 rounded-lg bg-blue-900/20 group-hover:bg-blue-900/40 transition">
            <GraduationCap className="w-6 h-6 text-blue-400" />
          </div>
          <span className="text-xl font-bold tracking-wide text-white">
            Up<span className="text-blue-400">Craft</span>
          </span>
        </Link>

        {/* NAV */}
        <div className="flex items-center gap-2">
          {!accessToken && (
            <>
              <Link
                to="/login"
                className={`px-4 py-2 rounded-lg ${isActive("/login")}`}
              >
                Login
              </Link>
              <Link
                to="/register"
                className={`px-4 py-2 rounded-lg ${isActive("/register")}`}
              >
                Register
              </Link>
            </>
          )}

          {accessToken && (
            <>
              <Link
                to="/"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${isActive(
                  "/"
                )}`}
              >
                <Home className="w-4 h-4" /> Home
              </Link>

              <Link
                to="/courses"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${isActive(
                  "/courses"
                )}`}
              >
                <BookOpen className="w-4 h-4" /> Courses
              </Link>

              <Link
                to="/profile"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${isActive(
                  "/profile"
                )}`}
              >
                <User className="w-4 h-4" /> Profile
              </Link>

              <button
                onClick={handleLogout}
                className="ml-2 px-4 py-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
