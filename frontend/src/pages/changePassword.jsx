import { useState, useContext } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ChangePassword() {
  const { accessToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmNewPassword) {
      setError("New passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const res = await api.put(
        "/change-password",
        { oldPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setSuccess(res.data.message);
      setTimeout(() => navigate("/profile"), 1000);
    } catch (err) {
      setError(err.response?.data?.message || "Password change failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl shadow-xl p-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-white">Change Password</h1>
          <p className="text-sm text-gray-400">Update your account security</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1">
            <label className="text-sm text-gray-300">Old Password</label>
            <input
              type="password"
              placeholder="Old password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
              className="w-full rounded-md bg-gray-800 border border-gray-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm text-gray-300">New Password</label>
            <input
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full rounded-md bg-gray-800 border border-gray-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm text-gray-300">
              Confirm New Password
            </label>
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              required
              className="w-full rounded-md bg-gray-800 border border-gray-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition font-medium text-white"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>

        {/* Messages */}
        {error && (
          <p className="text-sm text-red-500 text-center mt-4">{error}</p>
        )}

        {success && (
          <p className="text-sm text-green-500 text-center mt-4">{success}</p>
        )}
      </div>
    </div>
  );
}
