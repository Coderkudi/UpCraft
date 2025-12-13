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
    navigate("/update-profile");
  };

  const handleChangePassword = () => {
    navigate("/change-password");
  };

  // const handleLogout = async () => {
  //   try {
  //     await api.post("/logout");
  //   } catch (error) {
  //     console.log("Logout error", error);
  //   }

  //   logout();
  //   navigate("/login");
  };

  if (!profile) {
    return (
      <div style={{ padding: "20px", fontSize: "20px", color: "white" }}>
        Loading profile...
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        padding: "20px",
        background: "#1e1e1e",
        color: "white",
        borderRadius: "8px",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>My Profile</h2>

      <p>
        <strong>Username:</strong> {profile.username}
      </p>

      <p>
        <strong>Email:</strong> {profile.email}
      </p>

      <p>
        <strong>Joined:</strong> {new Date(profile.createdAt).toDateString()}
      </p>

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={handleEditProfile}
          style={{
            marginRight: "10px",
            padding: "10px 20px",
            background: "#4ea1ff",
            color: "white",
            borderRadius: "6px",
          }}
        >
          Edit Profile
        </button>

        <button
          onClick={handleChangePassword}
          style={{
            marginRight: "10px",
            padding: "10px 20px",
            background: "#ffa34e",
            color: "white",
            borderRadius: "6px",
          }}
        >
          Change Password
        </button>
        {/* <button
          onClick={handleLogout}
          style={{
            padding: "10px 20px",
            background: "red",
            color: "white",
            borderRadius: "6px",
          }}
        >
          Logout
        </button> */}
      </div>
    </div>
  );
}
