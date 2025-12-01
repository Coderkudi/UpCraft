import { useEffect, useContext, useState } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

export default function Profile() {
  const { accessToken } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    api
      .get("/profile", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => setProfile(res.data))
      .catch(() => console.log("Unauthorized"));
  }, []);

  return (
    <div>
      <h1>Profile</h1>
      {profile && <pre>{JSON.stringify(profile, null, 2)}</pre>}
    </div>
  );
}
