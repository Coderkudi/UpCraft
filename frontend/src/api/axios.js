// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:8000/api/v1",
//   withCredentials: true, // sends refresh token cookie
// });

// export default api;

import axios from "axios";

// Create Axios Instance
const api = axios.create({
    baseURL: "http://localhost:5000/api/v1",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

export default api;