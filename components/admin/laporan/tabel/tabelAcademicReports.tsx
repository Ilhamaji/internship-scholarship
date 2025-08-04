import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import ModalEdit from "@/components/admin/laporan/modal/komentarAcademicReports";

export default function App({
  komentarAcademicReports,
  setKomentarAcademicReports,
  academicReports,
  setAcademicReports,
}: {
  komentarAcademicReports: any;
  setKomentarAcademicReports: any;
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
        <TableRow key={academicReports.semester}>
          <TableCell>{academicReports.semester}</TableCell>
          <TableCell>{academicReports.ips}</TableCell>
          <TableCell>{academicReports.ipk}</TableCell>
          <TableCell>
            <div className="flex flex-row gap-2 justify-end">
              <ModalEdit
                komentarAcademicReports={komentarAcademicReports}
                setKomentarAcademicReports={setKomentarAcademicReports}
                setAcademicReports={setAcademicReports}
                academicReports={academicReports}
              />
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
