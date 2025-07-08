"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import ModalEdit from "@/components/dashboard/modal/edit";
import ModalDelete from "@/components/dashboard/modal/delete";
import { Link } from "@heroui/link";

export default function App() {
  return (
    <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>NO</TableColumn>
        <TableColumn>NAMA UKM</TableColumn>
        <TableColumn>JABATAN</TableColumn>
        <TableColumn>POIN KEAKTIFAN</TableColumn>
        <TableColumn>BUKTI</TableColumn>
        <TableColumn className="text-end">ACTION</TableColumn>
      </TableHeader>
      <TableBody>
        <TableRow key="1">
          <TableCell>1</TableCell>
          <TableCell>Seminar Bangkit</TableCell>
          <TableCell>22 Juni 2024</TableCell>
          <TableCell>Kampus Gedung C.23</TableCell>
          <TableCell>
            <Link>Bukti.jpg</Link>
          </TableCell>
          <TableCell className="flex flex-row gap-2 justify-end">
            <ModalEdit />
            <ModalDelete />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
