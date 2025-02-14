import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BACKEND_API_URL;

const token = import.meta.env.VITE_GITHUB_API_TOKEN;
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    authorization: token,
  },
});

export default axiosInstance;
