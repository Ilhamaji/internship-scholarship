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
import ModalEditMahasiswa from "@/components/admin/root/modal/modalEditMahasiswa";
import ModalDeleteMahasiswa from "@/components/admin/root/modal/modalDeleteMahasiswa";

const fetcher = async (url: any) => {
  const { data } = await api.get(url);
  return data.data;
};

export default function App() {
  const [page, setPage] = React.useState(1);
  const [refresh, setRefresh] = React.useState(false);
  const [angkatan, setAngkatan] = React.useState([]);

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

  if (!isLoading) {
    data?.result.map((item: any, index: any) => {
      if (angkatan.length === 0) {
        setAngkatan([item.studentDetails.angkatan]);
      } else {
        if (!angkatan.includes(item.studentDetails.angkatan)) {
          setAngkatan([...angkatan, item.studentDetails.angkatan]);
        }
      }
    });

    return (
      <Table
        width={"100%"}
        selectionMode="single"
        isStriped
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
          {data?.result.map((item: any, index: any) => {
            for (let i = 0; i < angkatan.length; i++) {
              if (item.studentDetails.angkatan === angkatan[i]) {
                return (
                  <TableRow key={index}>
                    <TableCell>{startIndex + index + 1}</TableCell>
                    <TableCell>{item.userId}</TableCell>
                    <TableCell>{item.name}</TableCell>
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
                );
              }
            }
          })}
        </TableBody>
      </Table>
    );
  }
}
