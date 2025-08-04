"use client";

import useSWR, { mutate } from "swr";
import React, { useEffect, useMemo, useState, ChangeEvent } from "react";
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
import ModalEditMahasiswa from "@/components/admin/root/modal/modalEditMahasiswa";
import ModalDeleteMahasiswa from "@/components/admin/root/modal/modalDeleteMahasiswa";

interface StudentDetails {
  angkatan?: string | null;
  // ... tambahkan jika ada field lain diperlukan
}

interface MahasiswaItem {
  userId: string;
  name?: string;
  studentDetails?: StudentDetails;
  // ... lainnya sesuai response
}

interface SWRResponse {
  result?: MahasiswaItem[];
  pagination?: {
    total?: number;
    // bisa ditambah page, per_page, dsb jika ada
  };
}

const ROWS_PER_PAGE = 10;

const fetcher = async (url: string): Promise<SWRResponse> => {
  const { data } = await api.get(url);
  return data.data;
};

const App: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [refresh, setRefresh] = useState<boolean>(false);

  const { data, isLoading } = useSWR<SWRResponse>(
    `/admin/mahasiswa?page=${page}`,
    fetcher,
    {
      keepPreviousData: true,
    }
  );

  // refresh trigger
  useEffect(() => {
    if (refresh) {
      void mutate(`/admin/mahasiswa?page=${page}`);
      setRefresh(false);
    }
  }, [refresh, page]);

  // derive pagination
  const totalPages = useMemo(() => {
    if (!data?.pagination?.total) return 0;
    return Math.ceil(data.pagination.total / ROWS_PER_PAGE);
  }, [data?.pagination?.total]);

  // unique angkatan list (didapat dari data, no state mutation during render)
  const angkatanOptions = useMemo<string[]>(() => {
    if (!data?.result) return [];
    const set = new Set<string>();
    data.result.forEach((item) => {
      const angkatan = item.studentDetails?.angkatan;
      if (angkatan) set.add(angkatan);
    });
    return Array.from(set).sort();
  }, [data?.result]);

  const startIndex = (page - 1) * ROWS_PER_PAGE;

  const loadingState = isLoading || !data?.result ? "loading" : "idle";
  const list = data?.result ?? [];

  return (
    <div className="px-2 md:px-6 xl:px-36">
      <Table
        width="100%"
        selectionMode="single"
        isStriped
        aria-label="Tabel mahasiswa"
        bottomContent={
          totalPages > 0 ? (
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={page}
                total={totalPages}
                onChange={(p) => setPage(p)}
              />
            </div>
          ) : null
        }
      >
        <TableHeader>
          <TableColumn>NO</TableColumn>
          <TableColumn>NIM</TableColumn>
          <TableColumn>NAMA</TableColumn>
          <TableColumn className="text-end">AKSI</TableColumn>
        </TableHeader>
        <TableBody
          items={list}
          loadingContent={<Spinner />}
          loadingState={loadingState}
        >
          {list.map((item, index) => (
            <TableRow key={item.userId || index}>
              <TableCell>{startIndex + index + 1}</TableCell>
              <TableCell>{item.userId}</TableCell>
              <TableCell>{item.name || "-"}</TableCell>
              <TableCell className="flex flex-row gap-2 py-5 justify-end">
                <div className="flex flex-row gap-2 py-3">
                  <ModalEditMahasiswa userId={item.userId} />
                  <ModalDeleteMahasiswa
                    userId={item.userId}
                    refresh={refresh}
                    setRefresh={setRefresh}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default App;
