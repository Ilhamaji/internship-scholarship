import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import ModalEdit from "@/components/dashboard/mahasiswa/laporan/modal/editAcademicReports";
import ModalDelete from "@/components/dashboard/modal/delete";

export default function App({
  academicReports,
  setAcademicReports,
}: {
  academicReports: any;
  setAcademicReports: any;
}) {
  return (
    <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>SEMESTER</TableColumn>
        <TableColumn>IPS</TableColumn>
        <TableColumn>IPK</TableColumn>
        <TableColumn className="text-end">AKSI</TableColumn>
      </TableHeader>
      <TableBody>
        <TableRow key="1">
          <TableCell>{academicReports.semester}</TableCell>
          <TableCell>{academicReports.ips}</TableCell>
          <TableCell>{academicReports.ipk}</TableCell>
          <TableCell>
            <div className="flex flex-row gap-2 justify-end">
              <ModalEdit
                setAcademicReports={setAcademicReports}
                academicReports={academicReports}
              />
              <ModalDelete />
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
