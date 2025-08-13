"use client";
import React, { SVGProps } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import ModalEdit from "@/components/dashboard/mahasiswa/root/edit";
import ModalDelete from "@/components/dashboard/mahasiswa/root/delete";
import { Chip } from "@heroui/chip";

export default function App({
  monevData,
  setSubmitted,
  submitted,
}: {
  monevData: any;
  setSubmitted: any;
  submitted: boolean;
}) {
  return (
    <Table
      aria-label="Example static collection table"
      className="max-h-[50vh]"
      isStriped
    >
      <TableHeader>
        <TableColumn className="bg-[#E8BE00] text-white">SEMESTER</TableColumn>
        <TableColumn className="bg-[#E8BE00] text-white">
          TAHUN AJARAN
        </TableColumn>
        <TableColumn className="bg-[#E8BE00] text-white">
          GANJIL/GENAP
        </TableColumn>
        <TableColumn className="bg-[#E8BE00] text-white">STATUS</TableColumn>
        <TableColumn className="text-end bg-[#E8BE00] text-white">
          AKSI
        </TableColumn>
      </TableHeader>
      <TableBody>
        {monevData.map((item: any) =>
          item.status !== "Draft" && item.status !== "Pending" ? (
            <TableRow key={item.id}>
              <TableCell>{item.semesterId}</TableCell>
              <TableCell>{item.semesterDetail.tahunAjar}</TableCell>
              <TableCell>{item.semesterDetail.semester}</TableCell>
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
              <TableCell>
                {item.status === "Draft" ? (
                  <div className="flex flex-row gap-2 justify-end">
                    <ModalEdit laporanId={item.laporanId} />
                    <ModalDelete
                      laporanId={item.laporanId}
                      setSubmitted={setSubmitted}
                      submitted={submitted}
                    />
                  </div>
                ) : (
                  ""
                )}
              </TableCell>
            </TableRow>
          ) : (
            ""
          )
        )}
      </TableBody>
    </Table>
  );
}
