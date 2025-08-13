"use client";

import useSWR from "swr";
import React, { useEffect, useMemo, useState } from "react";
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
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import api from "@/lib/axios";
import ModalEditMahasiswa from "@/components/admin/root/modal/modalEditMahasiswa";
import ModalDeleteMahasiswa from "@/components/admin/root/modal/modalDeleteMahasiswa";
import { useRouter, usePathname } from "next/navigation";

const fetcher = async (url: string) => {
  const { data } = await api.get(url);
  return data.data; // sesuai struktur API kamu
};

export default function App() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [angkatanFilter, setAngkatanFilter] = useState("");
  const [prodiFilter, setProdiFilter] = useState("");
  const [refresh, setRefresh] = useState(false);
  const rowsPerPage = 10;

  // Ambil semua data sekaligus
  const { data, isLoading } = useSWR(`/admin/mahasiswa?limit=9999`, fetcher);

  // Ambil list unik angkatan & prodi dari data
  const angkatanOptions = useMemo(() => {
    const set = new Set<string>();
    data?.result.forEach((item: any) => {
      if (item.studentDetails?.angkatan) {
        set.add(item.studentDetails.angkatan);
      }
    });
    return Array.from(set);
  }, [data]);

  const prodiOptions = useMemo(() => {
    const set = new Set<string>();
    data?.result.forEach((item: any) => {
      if (item.studentDetails?.prodi) {
        set.add(item.studentDetails.prodi);
      }
    });
    return Array.from(set);
  }, [data]);

  // Reset Filter
  useEffect(() => {
    setPage(1);
  }, [searchTerm, angkatanFilter, prodiFilter]);

  const allResults = data?.result ?? [];
  // Filter data
  const filteredData = useMemo(() => {
    if (!data?.result) return [];
    return data.result.filter((item: any) => {
      const matchSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.userId.toString().includes(searchTerm);
      const matchAngkatan =
        !angkatanFilter || item.studentDetails?.angkatan === angkatanFilter;
      const matchProdi =
        !prodiFilter || item.studentDetails?.prodi === prodiFilter;
      return matchSearch && matchAngkatan && matchProdi;
    });
  }, [data, searchTerm, angkatanFilter, prodiFilter]);

  // Pagination data hasil filter
  const paginatedData = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return filteredData.slice(start, start + rowsPerPage);
  }, [filteredData, page]);

  const pages = Math.ceil(filteredData.length / rowsPerPage);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Spinner />
      </div>
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
          <button
            onClick={() => router.push("/admin/mahasiswa/register/mahasiswa")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Tambah Mahasiswa
          </button>

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
            value={prodiFilter}
            onChange={(e) => setProdiFilter(e.target.value)}
            className="border px-3 py-2 rounded-md"
          >
            <option value="">Semua Prodi</option>
            {prodiOptions.map((prodi) => (
              <option key={prodi} value={prodi}>
                {prodi}
              </option>
            ))}
          </select>

          <button
            onClick={() => {
              setSearchTerm("");
              setAngkatanFilter("");
              setProdiFilter("");
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
        selectionMode="single"
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
          <TableColumn className="bg-[#0097A7] text-white">No</TableColumn>
          <TableColumn className="bg-[#0097A7] text-white">NIM</TableColumn>
          <TableColumn className="bg-[#0097A7] text-white">
            Nama Mahasiswa
          </TableColumn>
          <TableColumn className="bg-[#0097A7] text-white">
            Angkatan
          </TableColumn>
          <TableColumn className="bg-[#0097A7] text-white">Prodi</TableColumn>
          <TableColumn className="bg-[#0097A7] text-white">
            Jenis Kelamin
          </TableColumn>
          <TableColumn className="bg-[#0097A7] text-white">Status</TableColumn>
          <TableColumn className="bg-[#0097A7] text-white text-end">
            Aksi
          </TableColumn>
        </TableHeader>
        <TableBody items={paginatedData}>
          {paginatedData.map((item: any, index: number) => (
            <TableRow key={item.userId}>
              <TableCell>{(page - 1) * rowsPerPage + index + 1}</TableCell>
              <TableCell>{item.userId}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.studentDetails?.angkatan}</TableCell>
              <TableCell>{item.studentDetails?.prodi}</TableCell>
              <TableCell>{item.studentDetails?.jenisKelamin}</TableCell>
              <TableCell>{item.studentDetails?.status}</TableCell>
              <TableCell className="flex gap-2 justify-end py-6">
                <ModalEditMahasiswa userId={item.userId} />
                <ModalDeleteMahasiswa
                  userId={item.userId}
                  refresh={refresh}
                  setRefresh={setRefresh}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
