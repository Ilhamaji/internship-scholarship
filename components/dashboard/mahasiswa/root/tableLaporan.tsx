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

export default function App(monevData: any) {
  return (
    <Table
      aria-label="Example static collection table"
      className="max-h-[50vh]"
    >
      <TableHeader>
        <TableColumn>SEMESTER</TableColumn>
        <TableColumn>TAHUN AJARAN</TableColumn>
        <TableColumn>GANJIL/GENAP</TableColumn>
        <TableColumn>STATUS</TableColumn>
        <TableColumn className="text-end">AKSI</TableColumn>
      </TableHeader>
      <TableBody>
        {monevData.monevData.map((item: any) => (
          <TableRow key={item.id}>
            <TableCell>{item.semesterId}</TableCell>
            <TableCell>{item.semesterDetail.tahunAjar}</TableCell>
            <TableCell>{item.semesterDetail.semester}</TableCell>
            <TableCell>{item.status}</TableCell>
            <TableCell>
              <div className="flex flex-row gap-2 justify-end">
                <ModalEdit laporanId={item.laporanId} />
                <ModalDelete />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
