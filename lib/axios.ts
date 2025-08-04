import axios from "axios";
import Cookies from "js-cookie";
import { logout } from "@/lib/auth"; // Import fungsi logout

const API_URL = "https://tsu-kip-api-production.up.railway.app/";

// Axios instance utama
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Flag / queue untuk mencegah multiple refresh sekaligus
let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];

function subscribeTokenRefresh(cb: (token: string) => void) {
  refreshSubscribers.push(cb);
}

function onRefreshed(token: string) {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
}

// Instance terpisah untuk request refresh agar tidak masuk ke interceptor utama
const refreshClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Tambahkan Authorization header otomatis kalau ada accessToken
api.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
      config.headers = config.headers || {};
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor untuk menangani 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Jika 401 dan belum dicoba refresh
    if (error.response?.status === 401 && !originalRequest?._retry) {
      const refreshToken = Cookies.get("refreshToken");
      const userId = Cookies.get("userId");

      if (!refreshToken || !userId) {
        logout();
        return Promise.reject(error);
      }

      // Tandai supaya tidak masuk loop
      originalRequest._retry = true;

      if (isRefreshing) {
        // Kalau sudah ada pemanggilan refresh yang berjalan, tunggu hasilnya
        return new Promise((resolve, reject) => {
          subscribeTokenRefresh((newToken) => {
            if (!originalRequest.headers) originalRequest.headers = {};
            originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
            resolve(api(originalRequest));
          });
        });
      }

      isRefreshing = true;

      try {
        const resp = await refreshClient.get(`/refresh-token/${userId}`, {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        });

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          resp.data;

        if (!newAccessToken) {
          throw new Error("No access token in refresh response");
        }

        // Update cookie access token
        Cookies.set("accessToken", newAccessToken, {
          expires: 1 / 24, // 1 jam
          secure: true,
          sameSite: "lax",
        });

        // Kalau backend juga mengembalikan refreshToken baru, update dan kirim ke DB
        if (newRefreshToken) {
          Cookies.set("refreshToken", newRefreshToken, {
            expires: 30, // misal 30 hari
            secure: true,
            sameSite: "lax",
          });

          // Kirim refresh token terbaru ke backend (POST /refresh-token)
          try {
            await api.post("/refresh-token", {
              userId,
              refreshToken: newRefreshToken,
            });
          } catch (e) {
            console.warn("Gagal mengirim refresh token baru ke server:", e);
            // tidak fatal, lanjutkan
          }
        }

        // Broadcast ke request lain yang menunggu
        onRefreshed(newAccessToken);
        isRefreshing = false;

        // Update header dan ulangi original request
        api.defaults.headers.common["Authorization"] =
          `Bearer ${newAccessToken}`;
        if (!originalRequest.headers) originalRequest.headers = {};
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        console.error("Refresh token failed:", refreshError);
        logout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Utility: saat login atau pertama kali mendapatkan refresh token, simpan dan kirim ke backend
export async function persistRefreshToken(
  userId: string,
  refreshToken: string
) {
  // Simpan di cookie
  Cookies.set("refreshToken", refreshToken, {
    expires: 30, // atur sesuai policy
    secure: true,
    sameSite: "lax",
  });
  Cookies.set("userId", userId, {
    expires: 30,
    secure: true,
    sameSite: "lax",
  });

  // Kirim ke backend
  try {
    await api.post("/refresh-token", {
      userId,
      refreshToken,
    });
  } catch (err) {
    console.warn("Gagal menyimpan refresh token ke server:", err);
    // opsional: retry logic bisa ditambahkan
  }
}

export default api;
