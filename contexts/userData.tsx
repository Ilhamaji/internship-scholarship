"use client";

// src/context/UserContext.tsx
import React, { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import api from "@/lib/axios";

// Define the type for the user data
interface User {
  id: string;
  name: string;
  email: string;
  // Add other fields as necessary
}

// Define context type
interface UserContextType {
  userData: User | null;
  setUserData: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const role = Cookies.get("role");
    const userId = Cookies.get("userId");

    if (role === "student" && userId) {
      const fetchData = async () => {
        try {
          const res = await api.get(`/users/${userId}`);
          setUserData(res.data.data);
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    } else {
      setLoading(false); // Jangan lupa untuk mengubah loading ke false jika bukan student
    }
  }, []);

  return (
    <UserContext.Provider
      value={{ userData, setUserData, loading, setLoading }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the user context
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
