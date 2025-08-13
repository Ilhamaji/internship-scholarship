import React from "react";
import TabelLaporan from "@/components/admin/root/tabel/tabelLaporan";
import TabelJumlahMhs from "@/components/admin/root/tabel/tabelJumlahMhs";
import TabelStatistik from "@/components/admin/root/tabel/tabelStatistik";

export default function Page() {
  return (
    <div className="px-4 md:px-6 xl:px-20 py-6 space-y-6">
      {/* Header */}
      <h1 className="text-2xl font-semibold">
        Selamat Datang, <span className="font-normal">Nama Admin</span>
      </h1>

      {/* Kartu atas */}
      <div className="flex flex-row gap-2">
        <TabelStatistik />
        <TabelJumlahMhs />
      </div>

      {/* Tabel bawah */}
      <div>
        <h2 className="text-lg font-medium mb-2">Laporan Mahasiswa Teratas</h2>
        <TabelLaporan />
      </div>
    </div>
  );
}
