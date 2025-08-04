"use client";

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import Cookies from "js-cookie";
import api from "@/lib/axios";

// Define the type for the user data
interface studentDetails {
  prodi: string;
  jenisBeasiswa: string;
  angkatan: string;
  kelas: string;
  jenisKelamin: string;
  noHp: string;
  alamat: string;
  // Add other fields as necessary
}

interface User {
  userId: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  studentDetails: studentDetails;
  // Add other fields as necessary
}

// Define context type
interface UserContextType {
  userData: User | null;
  setUserData: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  refreshUserData: () => Promise<void>; // Added this
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const refreshUserData = useCallback(async () => {
    const role = Cookies.get("role");
    const userId = Cookies.get("userId");

    if (role === "student" && userId) {
      setLoading(true);
      try {
        const res = await api.get(`/users/${userId}`);
        setUserData(res.data.data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setUserData(null);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshUserData(); // Initial fetch on mount
  }, [refreshUserData]);

  return (
    <UserContext.Provider
      value={{ userData, setUserData, loading, setLoading, refreshUserData }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
