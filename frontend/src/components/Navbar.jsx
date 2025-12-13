import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { accessToken, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="w-full bg-[#0f0f0f] text-white shadow-md px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-blue-400">
        UpCraft
      </Link>

      <div className="flex items-center gap-6">
        {!accessToken && (
          <>
            <Link
              to="/login"
              className="text-gray-300 hover:text-white transition"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="text-gray-300 hover:text-white transition"
            >
              Register
            </Link>
          </>
        )}

        {accessToken && (
          <>
            <Link
              to="/profile"
              className="text-gray-300 hover:text-white transition"
            >
              Profile
            </Link>

            <button
              onClick={handleLogout}
              className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded-md transition text-sm"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
