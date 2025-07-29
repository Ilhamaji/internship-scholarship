import axios from "axios";
import Cookies from "js-cookie";
import { logout } from "@/lib/auth"; // Import fungsi logout

const API_URL = "http://localhost:5000";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Tambahkan Authorization header jika token tersedia
api.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Tangani error 401 dan refresh token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = Cookies.get("refreshToken");
        const userId = Cookies.get("userId");

        if (!refreshToken || !userId) {
          logout();
          return Promise.reject(error);
        }

        // Panggil endpoint baru untuk refresh token
        const response = await axios.get(`${API_URL}/refresh-token/${userId}`, {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
          withCredentials: true,
        });

        const { accessToken: newAccessToken } = response.data;

        // Simpan token baru ke cookie
        Cookies.set("accessToken", newAccessToken, {
          expires: 1 / 24, // 1 jam
          secure: true,
        });

        // Update Authorization header dan ulangi request awal
        api.defaults.headers.common["Authorization"] =
          `Bearer ${newAccessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);
        logout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
