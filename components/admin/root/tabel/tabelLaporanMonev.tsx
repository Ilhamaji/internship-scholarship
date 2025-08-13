"use client";

import React, { useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import { Spinner } from "@heroui/spinner";
import { Pagination } from "@heroui/pagination";
import api from "@/lib/axios";
import ModalEditLaporan from "@/components/admin/root/modal/modalEditLaporan";
import ModalDeleteLaporan from "@/components/admin/root/modal/modalDeleteLaporan";
import { Chip } from "@heroui/chip";

const fetcher = async (url: string) => {
  const { data } = await api.get(url);
  return data.data;
};

const formatTanggal = (dateString: string) => {
  if (!dateString) return "";
  if (typeof window === "undefined") return "";
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};

export default function App() {
  const rowsPerPage = 10;

  // UI state
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [angkatanFilter, setAngkatanFilter] = useState("");
  const [semesterFilter, setSemesterFilter] = useState("");
  const [refresh, setRefresh] = useState(false);

  // Ambil semua data (limit besar)
  const { data, error, isLoading, mutate } = useSWR(
    "/admin/monev/laporan?status=Pending&status=Lolos&limit=9999",
    fetcher,
    { revalidateOnFocus: false }
  );

  // refresh handler (mis. setelah delete/edit)
  useEffect(() => {
    if (refresh) {
      mutate();
      setRefresh(false);
    }
  }, [refresh, mutate]);

  // Reset page saat filter/search berubah
  useEffect(() => {
    setPage(1);
  }, [searchTerm, angkatanFilter, semesterFilter]);

  const allResults = data?.result ?? [];

  // Ambil opsi angkatan otomatis (2 digit pertama NIM)
  const angkatanOptions = useMemo(() => {
    const s = new Set<string>();
    allResults.forEach((it: any) => {
      const nim = String(it.userId ?? "");
      if (nim.length >= 2) s.add(nim.slice(0, 2));
    });
    return Array.from(s).sort();
  }, [allResults]);

  // Ambil opsi semester otomatis dari item.semester (semesterId => label)
  const semesterOptions = useMemo(() => {
    const map = new Map<string, string>();
    allResults.forEach((it: any) => {
      if (it.semester && it.semesterId) {
        const label = `${it.semester.tahunAjaran} ${it.semester.semester}`;
        map.set(it.semesterId, label);
      }
    });
    // Convert to array of {value,label} sorted by label
    return Array.from(map.entries())
      .map(([value, label]) => ({ value, label }))
      .sort((a, b) => (a.label > b.label ? 1 : -1));
  }, [allResults]);

  // Filtered data (search + angkatan + semester)
  const filtered = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return allResults.filter((it: any) => {
      // exclude Draft
      if (it.status === "Draft") return false;

      const name = (it.user?.name || "").toLowerCase();
      const nim = String(it.userId || "");
      const matchesSearch =
        q === "" ||
        name.includes(q) ||
        nim.toLowerCase().includes(q) ||
        nim.includes(q);

      const nimAngkatan = nim.length >= 2 ? nim.slice(0, 2) : "";
      const matchesAngkatan = !angkatanFilter || nimAngkatan === angkatanFilter;

      const matchesSemester =
        !semesterFilter || it.semesterId === semesterFilter;

      return matchesSearch && matchesAngkatan && matchesSemester;
    });
  }, [allResults, searchTerm, angkatanFilter, semesterFilter]);

  // Pagination (client-side)
  const pages = Math.max(1, Math.ceil(filtered.length / rowsPerPage));
  const start = (page - 1) * rowsPerPage;
  const paginated = filtered.slice(start, start + rowsPerPage);

  const loadingState =
    isLoading || (filtered.length === 0 && searchTerm !== "" && !isLoading)
      ? "loading"
      : "idle";

  if (error) {
    return (
      <div className="text-red-500">Gagal memuat data: {String(error)}</div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="w-full md:w-1/3">
          <input
            type="text"
            placeholder="Cari berdasarkan NIM atau Nama"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border px-4 py-2 rounded-full"
          />
        </div>

        <div className="flex gap-2 items-center">
          <select
            value={angkatanFilter}
            onChange={(e) => setAngkatanFilter(e.target.value)}
            className="border px-3 py-2 rounded-md"
          >
            <option value="">Semua Angkatan</option>
            {angkatanOptions.map((a) => (
              <option key={a} value={a}>
                Angkatan {a}
              </option>
            ))}
          </select>

          <select
            value={semesterFilter}
            onChange={(e) => setSemesterFilter(e.target.value)}
            className="border px-3 py-2 rounded-md"
          >
            <option value="">Semua Semester</option>
            {semesterOptions.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>

          <button
            onClick={() => {
              setSearchTerm("");
              setAngkatanFilter("");
              setSemesterFilter("");
            }}
            className="px-3 py-2 border rounded-md"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Table */}
      <Table
        isStriped
        aria-label="Daftar Mahasiswa"
        bottomContent={
          pages > 1 && (
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
              />
            </div>
          )
        }
      >
        <TableHeader>
          <TableColumn className="bg-[#0097A7] text-white">NO</TableColumn>
          <TableColumn className="bg-[#0097A7] text-white text-center">
            SEMESTER
          </TableColumn>
          <TableColumn className="bg-[#0097A7] text-white">
            TAHUN AJARAN
          </TableColumn>
          <TableColumn className="bg-[#0097A7] text-white">NIM</TableColumn>
          <TableColumn className="bg-[#0097A7] text-white">NAMA</TableColumn>
          <TableColumn className="bg-[#0097A7] text-white">
            TANGGAL DIKIRIM
          </TableColumn>
          <TableColumn className="bg-[#0097A7] text-white">STATUS</TableColumn>
          <TableColumn className="bg-[#0097A7] text-white text-end">
            AKSI
          </TableColumn>
        </TableHeader>

        <TableBody
          items={paginated}
          loadingContent={<Spinner />}
          loadingState={loadingState}
        >
          {paginated.map((item: any, idx: number) => {
            const semesterValue = item.academicReports?.semester || "-";
            const tahunAjaranValue = item.semester
              ? `${item.semester.tahunAjaran} ${item.semester.semester}`
              : "-";

            return (
              <TableRow key={item.laporanId ?? idx}>
                <TableCell>{start + idx + 1}.</TableCell>
                <TableCell className="text-center">{semesterValue}</TableCell>
                <TableCell>{tahunAjaranValue}</TableCell>
                <TableCell>{item.userId || "-"}</TableCell>
                <TableCell>
                  <div className="line-clamp-2 overflow-hidden">
                    {item.user?.name || "-"}
                  </div>
                </TableCell>
                <TableCell>{formatTanggal(item.updatedAt)}</TableCell>
                <TableCell>
                  {item.status === "Lolos" ||
                  item.status === "Lolos dengan penugasan" ? (
                    <Chip color="success" className="text-white">
                      {item.status}
                    </Chip>
                  ) : item.status?.includes("Ditolak") ? (
                    <Chip color="danger">{item.status}</Chip>
                  ) : item.status === "Draft" ? (
                    <Chip className="text-white" color="warning">
                      {item.status}
                    </Chip>
                  ) : (
                    <Chip color="default">{item.status}</Chip>
                  )}
                </TableCell>
                <TableCell className="flex justify-end">
                  <div className="flex flex-row gap-2 py-4">
                    <ModalEditLaporan laporanId={item.laporanId} />
                    <ModalDeleteLaporan
                      laporanId={item.laporanId}
                      refresh={refresh}
                      setRefresh={setRefresh}
                    />
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {/* Info kecil */}
      <div className="text-sm text-muted">
        Menampilkan {filtered.length} hasil — halaman {page} dari {pages}
      </div>
    </div>
  );
}
