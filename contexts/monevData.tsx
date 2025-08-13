"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import api from "@/lib/axios";
import Cookies from "js-cookie";

interface MonevContextType {
  monevData: any;
  datas: any;
  loadingMonev: boolean;
  refreshMonev: () => Promise<void>;
}

const MonevContext = createContext<MonevContextType | undefined>(undefined);

export const MonevProvider = ({ children }: { children: ReactNode }) => {
  const [monevData, setMonevData] = useState<any>(null);
  const [datas, setDatas] = useState<any>(null);
  const [loadingMonev, setLoadingMonev] = useState(true);

  const fetchMonev = async () => {
    setLoadingMonev(true);
    try {
      const resMonev = await api.get(`/monev/${Cookies.get("userId")}`);
      setMonevData(resMonev.data.data.laporan);
      setDatas(resMonev.data.data);
    } catch (err) {
      console.error("Gagal fetch monev:", err);
    }
    setLoadingMonev(false);
  };

  useEffect(() => {
    fetchMonev();
  }, []);

  return (
    <MonevContext.Provider
      value={{ monevData, datas, loadingMonev, refreshMonev: fetchMonev }}
    >
      {children}
    </MonevContext.Provider>
  );
};

export const useMonev = () => {
  const context = useContext(MonevContext);
  if (!context) throw new Error("useMonev must be used inside MonevProvider");
  return context;
};
