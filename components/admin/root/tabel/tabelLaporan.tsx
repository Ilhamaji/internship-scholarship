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

  const fetcher = async (url: any) => {
    const { data } = await api.get(url);
    return data.data;
  };

  const endpoint = `/admin/monev/laporan?status=Pending&?page=${page}`;

  const { data, isLoading } = useSWR(endpoint, fetcher, {
    keepPreviousData: true,
  });

  // Use useEffect to refresh SWR data when shouldRefresh is triggered
  useEffect(() => {
    if (refresh) {
      mutate(endpoint); // re-fetch data
      setRefresh(false); // reset trigger
    }
  }, [refresh, endpoint]);

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
      width={"100%"}
      selectionMode="single"
      isStriped
      aria-label="Example table with client async pagination"
      bottomContent={
        pages > 0 ? (
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
        <TableColumn>NAMA</TableColumn>
        <TableColumn>STATUS</TableColumn>
        <TableColumn className="text-end">AKSI</TableColumn>
      </TableHeader>
      <TableBody
        items={data?.result ?? []}
        loadingContent={<Spinner />}
        loadingState={loadingState}
      >
        {data?.result.map((item: any, index: any) => {
          if (item.status!=="Draft") {
            return (
            <TableRow key={index}>
              <TableCell>{startIndex + index + 1}</TableCell>
              <TableCell>{item.semesterId}</TableCell>
              <TableCell>
                <div className="line-clamp-2 overflow-hidden">
                  {item.user.name}
                </div>
              </TableCell>
              <TableCell>
                {item.status === "Lolos" ||
                item.status === "Lolos dengan penugasan" ? (
                  <Chip color="success" className="text-white">
                    {item.status}
                  </Chip>
                ) : item.status === "Ditolak SP-1" ||
                  item.status === "Ditolak SP-2" ||
                  item.status === "Ditolak SP-3" ? (
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
                    setRefresh={setRefresh} // trigger refresh
                  />
                </div>
              </TableCell>
            </TableRow>
          );
          }
        })}
      </TableBody>
    </Table>
  );
}
