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
import ModalDelete from "@/components/dashboard/root/modal/delete";
import { Link } from "@heroui/link";

export default function App({
  academicReportsBukti,
  setAcademicReportsBukti,
  academicReports,
  setAcademicReports,
}: {
  academicReportsBukti: any;
  setAcademicReportsBukti: any;
  academicReports: any;
  setAcademicReports: any;
}) {
  return (
    <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>SEMESTER</TableColumn>
        <TableColumn>IPS</TableColumn>
        <TableColumn>IPK</TableColumn>
        <TableColumn>Bukti</TableColumn>
        <TableColumn className="text-end">AKSI</TableColumn>
      </TableHeader>
      {academicReports.length === 1 ? (
        <TableBody>
          <TableRow key={academicReports[0].semester}>
            <TableCell>{academicReports[0].semester}</TableCell>
            <TableCell>{academicReports[0].ips}</TableCell>
            <TableCell>{academicReports[0].ipk}</TableCell>
            <TableCell>
              {academicReports[0].buktiUrl === "Tidak Ada" ? (
                "Tidak Ada"
              ) : (
                <Link href={academicReports[0].buktiUrl} target="_blank">
                  Bukti
                </Link>
              )}
            </TableCell>
            <TableCell>
              <div className="flex flex-row gap-2 justify-end">
                <ModalEdit
                  academicReportsBukti={academicReportsBukti}
                  setAcademicReportsBukti={setAcademicReportsBukti}
                  setAcademicReports={setAcademicReports}
                  academicReports={academicReports}
                />
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      ) : (
        <TableBody>
          <TableRow key={academicReports.semester}>
            <TableCell>{academicReports.semester}</TableCell>
            <TableCell>{academicReports.ips}</TableCell>
            <TableCell>{academicReports.ipk}</TableCell>
            <TableCell>
              {academicReports.buktiUrl === "Tidak Ada" ? (
                "Tidak Ada"
              ) : (
                <Link href={academicReports.buktiUrl} target="_blank">
                  Bukti
                </Link>
              )}
            </TableCell>
            <TableCell>
              <div className="flex flex-row gap-2 justify-end">
                <ModalEdit
                  setAcademicReportsBukti={setAcademicReportsBukti}
                  academicReportsBukti={academicReportsBukti}
                  setAcademicReports={setAcademicReports}
                  academicReports={academicReports}
                />
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      )}
    </Table>
  );
}
