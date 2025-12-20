import { useState, useEffect, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

export default function UpdateProfile() {
  const { accessToken, user, login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!user) return;

    setUsername(user.username);
    setEmail(user.email);
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await api.put(
      "/update-profile",
      { username, email },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    login(accessToken, res.data.user);

    alert("Profile updated!");
  };

  return (
    <div style={{ maxWidth: "500px", margin: "40px auto" }}>
      <h2>Update Profile</h2>

      <form onSubmit={handleSubmit}>
        <input
          className="border border-black p-2"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="border border-black p-2"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit">Save</button>
      </form>
    </div>
  );
}
