import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:9000/api",
});

// attach token automatically
api.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.authorization = `Bearer ${token}`;
  }

  return req;
});

export default api;