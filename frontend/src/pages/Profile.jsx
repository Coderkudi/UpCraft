import { useContext, useEffect, useState } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { accessToken, logout } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) return;

    api
      .get("/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => setProfile(res.data.user))
      .catch((err) => {
        console.log("Unauthorized:", err.response?.data);
        logout();
      });
  }, [accessToken]);

  const handleEditProfile = () => {
    navigate("/updateProfile");
  };

  const handleChangePassword = () => {
    navigate("/changePassword");
  };

  const handleLogout = async () => {
    try {
      await api.post("/logout");
    } catch (error) {
      console.log("Logout error", error);
    }

    logout();
    navigate("/login");
  };

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center text-gray-300 text-lg">
        Loading profile…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-gray-900 border border-gray-800 rounded-2xl shadow-xl p-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-blue-600/20 flex items-center justify-center text-blue-400 text-3xl font-bold mb-4">
            {profile.username.charAt(0).toUpperCase()}
          </div>
          <h2 className="text-2xl font-bold text-white">My Profile</h2>
          <p className="text-sm text-gray-400">
            Manage your account information
          </p>
        </div>

        {/* Profile Info */}
        <div className="space-y-4 text-gray-300">
          <div className="flex justify-between border-b border-gray-800 pb-2">
            <span className="text-gray-400">Username</span>
            <span className="font-medium text-white">{profile.username}</span>
          </div>

          <div className="flex justify-between border-b border-gray-800 pb-2">
            <span className="text-gray-400">Email</span>
            <span className="font-medium text-white">{profile.email}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-400">Joined</span>
            <span className="font-medium text-white">
              {new Date(profile.createdAt).toDateString()}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-10 flex flex-col gap-3">
          <button
            onClick={handleEditProfile}
            className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition font-medium text-white"
          >
            Edit Profile
          </button>

          <button
            onClick={handleChangePassword}
            className="w-full py-3 rounded-lg bg-yellow-600 hover:bg-yellow-700 transition font-medium text-white"
          >
            Change Password
          </button>

          <button
            onClick={handleLogout}
            className="w-full py-3 rounded-lg bg-red-600 hover:bg-red-700 transition font-medium text-white"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
