import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import ModalEdit from "@/components/dashboard/mahasiswa/laporan/modal/editAcademicActivities";
import ModalDelete from "@/components/dashboard//mahasiswa/laporan/modal/hapusAcademicActivities";

export default function App({
  academicActivities,
  setAcademicActivities,
}: {
  academicActivities: any;
  setAcademicActivities: any;
}) {
  return (
    <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>NO</TableColumn>
        <TableColumn>NAMA KEGIATAN</TableColumn>
        <TableColumn>TIPE</TableColumn>
        <TableColumn>TANGGAL</TableColumn>
        <TableColumn>TEMPAT</TableColumn>
        <TableColumn>KEIKUTSERTAAN</TableColumn>
        <TableColumn>BUKTI</TableColumn>
        <TableColumn className="text-end">AKSI</TableColumn>
      </TableHeader>
      <TableBody>
        {academicActivities?.map((item: any, index: any) => (
          <TableRow key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{item.activityName}</TableCell>
            <TableCell>{item.activityType}</TableCell>
            <TableCell>
              {item.startDate || item.endtDate
                ? item.startDate + " - " + item.endDate
                : "Tidak Ada"}
            </TableCell>
            <TableCell>{item.place}</TableCell>
            <TableCell>{item.participation}</TableCell>
            <TableCell>{item.buktiUrl}</TableCell>
            <TableCell>
              <div className="flex flex-row gap-2 justify-end">
                <ModalEdit
                  index={index}
                  academicActivity={academicActivities}
                  setAcademicActivity={setAcademicActivities}
                />
                <ModalDelete />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
