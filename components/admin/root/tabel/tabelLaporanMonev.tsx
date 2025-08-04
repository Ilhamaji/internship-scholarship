"use client";

import useSWR, { mutate } from "swr";
import React, { useEffect } from "react";
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

export default function App() {
  const [page, setPage] = React.useState(1);
  const [refresh, setRefresh] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [angkatan, setAngkatan] = React.useState("");
  const [semester, setSemester] = React.useState("");

  const isSearching =
    searchTerm.trim() !== "" || angkatan !== "" || semester !== "";

  const endpoint = `/admin/monev/laporan?status=Pending&status=Lolos&limit=1000`;

  const fetcher = async (url: any) => {
    const { data } = await api.get(url);
    return data.data;
  };

  const { data, isLoading } = useSWR(endpoint, fetcher, {
    keepPreviousData: true,
  });

  useEffect(() => {
    if (refresh) {
      mutate(endpoint);
      setRefresh(false);
    }
  }, [refresh, endpoint]);

  useEffect(() => {
    setPage(1);
  }, [searchTerm, angkatan, semester]);

  const rowsPerPage = 10;

  const tableData = React.useMemo(() => {
    if (!data?.result) return [];
    return data.result.filter((item) => item.status !== "Draft");
  }, [data?.result]);

  const filteredData = React.useMemo(() => {
    if (!tableData) return [];
    const search = searchTerm.toLowerCase();
    return tableData.filter((item) => {
      const name = item.user?.name?.toLowerCase() || "";
      const nim = item.userId?.toString() || "";
      const semesterId = item.semesterId || "";
      const matchesSearch = name.includes(search) || nim.includes(search);

      const nimAngkatan = nim.substring(0, 2); // 2 digit awal dari userId
      const matchesAngkatan = !angkatan || nimAngkatan === angkatan;

      const matchesSemester = !semester || semesterId === semester;

      return matchesSearch && matchesAngkatan && matchesSemester;
    });
  }, [tableData, searchTerm, angkatan, semester]);

  const paginatedData = React.useMemo(() => {
    if (isSearching) return filteredData;
    const start = (page - 1) * rowsPerPage;
    return tableData.slice(start, start + rowsPerPage);
  }, [tableData, filteredData, page, isSearching]);

  const pages = React.useMemo(() => {
    if (isSearching) return 0;
    return data?.pagination.total
      ? Math.ceil(data?.pagination.total / rowsPerPage)
      : 0;
  }, [data?.pagination.total, isSearching]);

  const startIndex = isSearching ? 0 : (page - 1) * rowsPerPage;
  const loadingState =
    isLoading || (isSearching && filteredData.length === 0)
      ? "loading"
      : "idle";

  const semesterOptions = React.useMemo(() => {
    const years = [2022, 2023, 2024, 2025, 2026];
    const sems = [
      { label: "Ganjil", code: "01" },
      { label: "Genap", code: "02" },
    ];

    return years.flatMap((year) =>
      sems.map((s) => ({
        label: `${year} ${s.label}`,
        value: `SM${year}${s.code}`,
      }))
    );
  }, []);

  return (
    <>
      {/* Search & Filter */}
      <div className="mt-4 mb-4 flex flex-col md:flex-row justify-between items-center gap-4 px-2 md:px-6 xl:px-36">
        {/* Search (kiri) */}
        <div className="w-full md:w-1/5">
          <input
            type="text"
            placeholder="Cari berdasarkan NIM atau Nama"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-full focus:outline-none w-full"
          />
        </div>

        {/* Filter (kanan) */}
        <div className="flex gap-2 w-full md:w-auto">
          <select
            value={angkatan}
            onChange={(e) => setAngkatan(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-md"
          >
            <option value="">Angkatan</option>
            {[...Array(9)].map((_, i) => {
              const year = 22 + i;
              return (
                <option key={year} value={String(year)}>
                  Angkatan {year}
                </option>
              );
            })}
          </select>

          <select
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-md"
          >
            <option value="">Semester</option>
            {semesterOptions.map((s) => (
              <option key={s.value} value={s.value}>
                Semester {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Table
        className="px-2 md:px-6 xl:px-36"
        width={"100%"}
        selectionMode="single"
        isStriped
        aria-label="Tabel laporan monev"
        bottomContent={
          !isSearching && pages > 0 ? (
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
          ) : null
        }
      >
        <TableHeader>
          <TableColumn>NO</TableColumn>
          <TableColumn>SEMESTER</TableColumn>
          <TableColumn>NIM</TableColumn>
          <TableColumn>NAMA</TableColumn>
          <TableColumn>STATUS</TableColumn>
          <TableColumn className="text-end">AKSI</TableColumn>
        </TableHeader>
        <TableBody
          items={paginatedData}
          loadingContent={<Spinner />}
          loadingState={loadingState}
        >
          {paginatedData.map((item: any, index: number) => (
            <TableRow key={index}>
              <TableCell>{startIndex + index + 1}</TableCell>
              <TableCell>{item.semesterId}</TableCell>
              <TableCell>{item.userId || "-"}</TableCell>
              <TableCell>
                <div className="line-clamp-2 overflow-hidden">
                  {item.user?.name || "-"}
                </div>
              </TableCell>
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
                <div className="flex flex-row gap-2 py-6">
                  <ModalEditLaporan laporanId={item.laporanId} />
                  <ModalDeleteLaporan
                    laporanId={item.laporanId}
                    refresh={refresh}
                    setRefresh={setRefresh}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
