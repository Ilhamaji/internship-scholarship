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
  getKeyValue,
} from "@heroui/table";
import { Spinner } from "@heroui/spinner";
import { Pagination } from "@heroui/pagination";
import api from "@/lib/axios";
import ModalEditMahasiswa from "@/components/admin/modal/modalEditMahasiswa";
import ModalDeleteMahasiswa from "@/components/admin/modal/modalDeleteMahasiswa";

const fetcher = async (url: any) => {
  const { data } = await api.get(url);
  return data.data;
};

export default function App() {
  const [page, setPage] = React.useState(1);
  const [refresh, setRefresh] = React.useState(false); // Trigger for refresh

  // SWR hook for fetching data
  const { data, isLoading } = useSWR(`/admin/mahasiswa?page=${page}`, fetcher, {
    keepPreviousData: true,
  });

  // Handle data refresh when refresh changes
  useEffect(() => {
    if (refresh) {
      mutate(`/admin/mahasiswa?page=${page}`); // Re-fetch data
      setRefresh(false); // Reset refresh trigger
    }
  }, [refresh, page]); // Refresh when refresh or page changes

  const rowsPerPage = 10;

  const pages = React.useMemo(() => {
    return data?.pagination.total
      ? Math.ceil(data?.pagination.total / rowsPerPage)
      : 0;
  }, [data?.pagination.total, rowsPerPage]);

  const loadingState =
    isLoading || data?.result.length === 0 ? "loading" : "idle";

  const startIndex = (page - 1) * 10;

  return (
    <Table
      aria-label="Example table with client async pagination"
      bottomContent={
        pages > 0 ? (
          <div className="flex w-full justify-center">
            <Pagination
              initialPage={1}
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
        <TableColumn>NIM</TableColumn>
        <TableColumn>NAMA</TableColumn>
        <TableColumn className="text-end">AKSI</TableColumn>
      </TableHeader>
      <TableBody
        items={data?.result ?? []}
        loadingContent={<Spinner />}
        loadingState={loadingState}
      >
        {data?.result.map((item: any, index: any) => (
          <TableRow key={index}>
            <TableCell>{startIndex + index + 1}</TableCell>
            <TableCell>{item.user.userId}</TableCell>
            <TableCell>{item.user.name}</TableCell>
            <TableCell className="flex flex-row gap-2 justify-end">
              <ModalEditMahasiswa userId={item.user.userId} />
              <ModalDeleteMahasiswa
                userId={item.user.userId}
                refresh={refresh}
                setRefresh={setRefresh}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
