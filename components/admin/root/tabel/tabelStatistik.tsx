"use client";

import React, { useState, useMemo, useEffect } from "react";
import useSWR from "swr";
import api from "@/lib/axios";

const fetcher = async (url: string) => {
  const { data } = await api.get(url);
  return data.data;
};

export default function StatistikLaporanMahasiswa() {
  const [selectedSemester, setSelectedSemester] = useState("");

  // Ambil semua laporan, buang Draft
  const { data: allData, isLoading } = useSWR(
    `/admin/monev/laporan?limit=9999`, // Pastikan API mendukung limit besar
    fetcher
  );

  function formatSemesterId(semesterId: string) {
    const year = semesterId.slice(2, 6);
    const termCode = semesterId.slice(6, 8);
    const termName = termCode === "01" ? "Ganjil" : "Genap";
    return `${year}/${parseInt(year) + 1} ${termName}`;
  }

  // Ambil daftar semester unik dari semua data
  const semesterList = useMemo(() => {
    if (!allData?.result) return [];
    const filtered = allData.result.filter(
      (item: any) => item.status !== "Draft"
    );
    const unique = Array.from(new Set(filtered.map((item: any) => item.semesterId)));
    return unique
      .sort((a, b) => b.localeCompare(a))
      .map((id: string) => ({
        id,
        label: formatSemesterId(id),
      }));
  }, [allData]);

  // Default semester = terbaru
  useEffect(() => {
    if (semesterList.length > 0 && !selectedSemester) {
      setSelectedSemester(semesterList[0].id);
    }
  }, [semesterList, selectedSemester]);

  // Hitung statistik berdasarkan semester yang dipilih
  const stats = useMemo(() => {
    if (!allData?.result || !selectedSemester) {
      return {
        total: 0,
        lolos: 0,
        ditolak_sp1: 0,
        ditolak_sp2: 0,
        ditolak_sp3: 0,
        lolos_dengan_penugasan: 0,
      };
    }

    const filtered = allData.result.filter(
      (item: any) =>
        item.status !== "Draft" && item.semesterId === selectedSemester
    );

    const counts = {
      total: filtered.length,
      lolos: 0,
      ditolak_sp1: 0,
      ditolak_sp2: 0,
      ditolak_sp3: 0,
      lolos_dengan_penugasan: 0,
    };

    filtered.forEach((item: any) => {
      switch (item.status) {
        case "Lolos":
          counts.lolos++;
          break;
        case "Ditolak SP-1":
          counts.ditolak_sp1++;
          break;
        case "Ditolak SP-2":
          counts.ditolak_sp2++;
          break;
        case "Ditolak SP-3":
          counts.ditolak_sp3++;
          break;
        case "Lolos dengan penugasan":
          counts.lolos_dengan_penugasan++;
          break;
      }
    });

    return counts;
  }, [allData, selectedSemester]);

  return (
    <div className="bg-white rounded-xl shadow-md p-4 w-full max-w-lg">
      <h3 className="font-medium mb-2">Statistik Laporan Mahasiswa</h3>

      {/* Dropdown Semester */}
      <div className="mb-4 flex items-center gap-2">
        <label>Semester:</label>
        <select
          value={selectedSemester}
          onChange={(e) => setSelectedSemester(e.target.value)}
          className="border border-gray-300 rounded-md px-2 py-1"
        >
          {semesterList.map((s) => (
            <option key={s.id} value={s.id}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      {/* Statistik */}
      {isLoading ? (
        <p className="text-gray-500">Loading...</p>
      ) : selectedSemester ? (
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <span>Total Laporan Monev : </span>
            <span className="font-semibold">{stats.total}</span>
          </div>
          <div className="flex justify-between">
            <span>
              Lolos : <span className="font-semibold">{stats.lolos}</span>
            </span>
            <span>
              Ditolak SP-3 :{" "}
              <span className="font-semibold">{stats.ditolak_sp3}</span>
            </span>
          </div>
          <div className="flex justify-between">
            <span>
              Ditolak SP-1 :{" "}
              <span className="font-semibold">{stats.ditolak_sp1}</span>
            </span>
            <span>
              Lolos Dengan Penugasan :{" "}
              <span className="font-semibold">
                {stats.lolos_dengan_penugasan}
              </span>
            </span>
          </div>
          <div>
            Ditolak SP-2 :{" "}
            <span className="font-semibold">{stats.ditolak_sp2}</span>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">Pilih semester untuk melihat statistik</p>
      )}
    </div>
  );
}
