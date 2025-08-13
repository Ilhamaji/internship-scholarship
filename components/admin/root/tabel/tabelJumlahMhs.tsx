"use client";

import useSWR from "swr";
import React from "react";
import api from "@/lib/axios";

const fetcher = async (url: string) => {
  const { data } = await api.get(url);
  return data.data;
};

export default function JumlahMahasiswaCard() {
  const { data, isLoading, error } = useSWR("/admin/mahasiswa?page=1", fetcher);

  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-60 h-60 flex flex-col items-center justify-center text-center">
      <h3 className="text-md font-medium mb-3">Jumlah Mahasiswa</h3>
      <img
        src="/icon/people.svg"
        alt="People Icon"
        className="w-12 h-12 mb-4"
      />

      {isLoading ? (
        <p className="text-gray-400 text-sm">Loading...</p>
      ) : error ? (
        <p className="text-red-500 text-sm">Error</p>
      ) : (
        <p className="text-2xl font-semibold">
          {data?.pagination?.total ?? 0}
        </p>
      )}
    </div>
  );
}
