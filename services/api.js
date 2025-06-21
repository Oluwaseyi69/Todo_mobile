// services/api.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API_BASE_URL = "http://localhost:5050/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 1️⃣ OPTION A: Interceptor to pull token from AsyncStorage on every request
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 2️⃣ OPTION B: Set it once after login (no need for interceptor)
//   After you log in and get the token, do:
//     api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//   That way all subsequent api.get/post/etc. calls will include it.

// Export the instance
export default api;
