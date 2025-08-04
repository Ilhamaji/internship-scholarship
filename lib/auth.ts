import axios from "axios";
import Cookies from "js-cookie";

const API_URL = process.env.API_URL || "http://localhost:5000";

export const login = async (
  setError: any,
  identifier: string,
  password: string
) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      identifier,
      password,
    });

    const { accessToken, refreshToken } = response.data.data;
    const { userId, name, role, avatar } = response.data.data.user;

    if (accessToken && refreshToken) {
      // Simpan token ke cookies
      Cookies.set("accessToken", accessToken, {
        expires: 1 / 24,
        secure: true,
      }); // Expire dalam 1 jam

      // Expire dalam 7 hari
      Cookies.set("userId", userId, { expires: 7, secure: true });
      Cookies.set("name", name, { expires: 7, secure: true });
      Cookies.set("role", role, { expires: 7, secure: true });
      Cookies.set("avatar", avatar, { expires: 7, secure: true });
      Cookies.set("refreshToken", refreshToken, { expires: 7, secure: true });
    }

    return response.data;
  } catch (error: any) {
    return setError(error.response?.data?.message);
  }
};

export const registerAdmin = async (
  setError: any,
  name: string,
  email: string,
  password: string
) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register/admin`, {
      name,
      email,
      password,
    });

    return response.data;
  } catch (error: any) {
    return setError(error.response?.data?.message);
  }
};

export const logout = () => {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
  window.location.href = "/login";
};
