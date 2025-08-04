import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import ModalKomentar from "@/components/admin/laporan/modal/komentarAcademicActivities";

export default function App({
  komentarAcademicActivities,
  setKomentarAcademicActivities,
  academicActivities,
  setAcademicActivities,
}: {
  komentarAcademicActivities: any;
  setKomentarAcademicActivities: any;
  academicActivities: any;
  setAcademicActivities: any;
}) {
  return (
    <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>NO</TableColumn>
        <TableColumn>NAMA KEGIATAN</TableColumn>
        <TableColumn>TIPE</TableColumn>
        <TableColumn>TEMPAT</TableColumn>
        <TableColumn>KEIKUTSERTAAN</TableColumn>
        <TableColumn>TANGGAL MULAI</TableColumn>
        <TableColumn>TANGGAL SELESAI</TableColumn>
        <TableColumn>BUKTI</TableColumn>
        <TableColumn className="text-end">AKSI</TableColumn>
      </TableHeader>
      <TableBody>
        {academicActivities?.map((item: any, index: any) => (
          <TableRow key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{item.activityName}</TableCell>
            <TableCell>{item.activityType}</TableCell>
            <TableCell>{item.place}</TableCell>
            <TableCell>{item.participation}</TableCell>
            <TableCell>{item.startDate}</TableCell>
            <TableCell>{item.endDate}</TableCell>
            <TableCell>{item.buktiUrl}</TableCell>
            <TableCell>
              <ModalKomentar
                index={index}
                komentarAcademicActivities={komentarAcademicActivities}
                setKomentarAcademicActivities={setKomentarAcademicActivities}
                academicActivities={academicActivities}
                setAcademicActivities={setAcademicActivities}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
