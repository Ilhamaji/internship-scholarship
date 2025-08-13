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
import api from "@/lib/axios";
import ModalEditLaporan from "@/components/admin/root/modal/modalEditLaporan";
import ModalDeleteLaporan from "@/components/admin/root/modal/modalDeleteLaporan";
import { Chip } from "@heroui/chip";
import { Button } from "@heroui/button";

// Format tanggal
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
  const [refresh, setRefresh] = React.useState(false);

  const fetcher = async (url: any) => {
    const { data } = await api.get(url);
    console.log(data.data);
    return data.data;
  };

  const endpoint = `/admin/monev/laporan?status=Pending`;

  const { data, isLoading } = useSWR(endpoint, fetcher, {
    keepPreviousData: true,
  });

  useEffect(() => {
    if (refresh) {
      mutate(endpoint);
      setRefresh(false);
    }
  }, [refresh, endpoint]);

  const loadingState =
    isLoading || data?.result?.length === 0 ? "loading" : "idle";

  const latestFive = React.useMemo(() => {
    if (!data?.result) return [];
    return [...data.result]
      .sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      )
      .slice(0, 5);
  }, [data?.result]);

  return (
    <Table
      isStriped
      width="100%"
      aria-label="Tabel Laporan Terbaru"
      classNames={{
        wrapper: "rounded-none shadow-none",
        table: "min-w-full border-collapse",
        th: "bg-[#0097A7] text-white font-semibold px-4 py-2 text-left",
        td: "px-4 py-2 text-left",
        tr: "hover:bg-gray-50",
      }}
    >
      <TableHeader>
        <TableColumn>No</TableColumn>
        <TableColumn className="text-center">Semester</TableColumn>
        <TableColumn>Tahun Ajaran</TableColumn>
        <TableColumn>NIM</TableColumn>
        <TableColumn>Nama Mahasiswa</TableColumn>
        <TableColumn>Tanggal Dikirim</TableColumn>
        <TableColumn>Status</TableColumn>
        <TableColumn className="text-right">Aksi</TableColumn>
      </TableHeader>
      <TableBody
        items={latestFive}
        loadingContent={<Spinner />}
        loadingState={loadingState}
      >
        {latestFive.map((item: any, index: any) => {
          const semesterValue = item.academicReports?.semester || "-";
          const tahunAjaranValue = item.semester
            ? `${item.semester.tahunAjaran} ${item.semester.semester}`
            : "-";

          return (
            <TableRow key={index}>
              <TableCell>{index + 1}.</TableCell>
              <TableCell className="text-center">{semesterValue}</TableCell>
              <TableCell>{tahunAjaranValue}</TableCell>
              <TableCell>{item.user?.userId || "-"}</TableCell>
              <TableCell>{item.user?.name}</TableCell>
              <TableCell>{formatTanggal(item.updatedAt)}</TableCell>
              <TableCell>
                {item.status === "Lolos" ||
                item.status === "Lolos dengan penugasan" ? (
                  <Chip color="success" className="text-white">
                    {item.status}
                  </Chip>
                ) : item.status.startsWith("Ditolak") ? (
                  <Chip color="danger">{item.status}</Chip>
                ) : item.status === "Draft" ? (
                  <Chip className="text-white" color="warning">
                    {item.status}
                  </Chip>
                ) : (
                  <Chip color="default">{item.status}</Chip>
                )}
              </TableCell>
              <TableCell className="text-right py-6">
                <div className="flex flex-row gap-2">
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

        <TableRow>
          <TableCell colSpan={8} className="text-right">
            <a href="/admin/laporan_monev">
              <Button style={{ backgroundColor: "#0097A7", color: "#FFFFFF" }}>
                Lihat Selengkapnya
              </Button>
            </a>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
