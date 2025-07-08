import axios from "axios";
import {
  getAccessToken,
  setAccessToken,
  getRefreshToken,
} from "@/lib/tokenStore"; // 1. Impor getRefreshToken
import Cookies from "js-cookie";

const base_url = "http://localhost:5000";

const api = axios.create({
  baseURL: base_url,
  withCredentials: true,
});

// Interceptor untuk menambahkan Access Token ke setiap request
api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// --- Logika untuk Refresh Token ---
let isRefreshing = false;
let failedQueue: {
  resolve: (value: unknown) => void;
  reject: (reason?: any) => void;
}[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Interceptor untuk menangani response error (misal: 401 Unauthorized)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Jika error 401 dan request ini belum pernah di-retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Jika proses refresh sedang berjalan, masukkan request yang gagal ke dalam antrian
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token: any) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            return api(originalRequest); // Coba lagi request asli dengan token baru
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true; // Tandai request ini sudah pernah di-retry
      isRefreshing = true;

      // 2. Ambil refresh token dari store
      const currentRefreshToken = getRefreshToken();
      if (!currentRefreshToken) {
        console.error("No refresh token available.");
        window.location.href = "/login"; // Redirect ke login jika tidak ada refresh token
        return Promise.reject(error);
      }

      try {
        // 3. Kirim request untuk mendapatkan access token baru
        const { data } = await axios.post(
          `${base_url}/auth/refresh-token`,
          { refreshToken: currentRefreshToken } // Kirim refresh token di body
        );

        // Simpan access token yang baru
        setAccessToken(data.accessToken);

        // Set header Authorization untuk request yang gagal tadi
        originalRequest.headers["Authorization"] = `Bearer ${data.accessToken}`;

        // Proses semua request yang ada di antrian dengan token baru
        processQueue(null, data.accessToken);

        // Coba lagi request asli yang gagal
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        // Jika refresh token juga gagal/kadaluarsa, hapus token dan redirect ke login
        console.error("Token refresh failed:", refreshError);
        setAccessToken(""); // Hapus token yang tidak valid
        window.location.href = "/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
