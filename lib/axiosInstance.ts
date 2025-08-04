import axios from "axios";
import Cookies from "js-cookie";
import { logout } from "./auth"; // Import fungsi logout

const API_URL = process.env.API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Menambahkan accessToken ke setiap request
api.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Menangani token kedaluwarsa (401 Unauthorized)
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Jika error adalah 401 dan ini bukan request untuk refresh token itu sendiri
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Tandai sebagai sudah di-retry untuk menghindari loop tak terbatas

      try {
        const refreshToken = Cookies.get("refreshToken");
        if (!refreshToken) {
          // Jika tidak ada refresh token, langsung logout
          logout();
          return Promise.reject(error);
        }

        const response = await axios.post(`${API_URL}/auth/refresh-token`, {
          refreshToken,
        });

        const { accessToken } = response.data;

        // Simpan access token yang baru
        Cookies.set("accessToken", accessToken, {
          expires: 1 / 24,
          secure: true,
        });

        // Update header Authorization di request asli dengan token baru
        api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;

        // Ulangi request yang gagal tadi dengan token baru
        return api(originalRequest);
      } catch (refreshError) {
        // Jika refresh token juga gagal/kedaluwarsa, logout user
        console.error("Refresh token failed:", refreshError);
        logout(); // Hapus cookie dan redirect ke login
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
