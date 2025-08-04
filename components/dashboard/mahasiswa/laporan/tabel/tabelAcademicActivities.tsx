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
import { Link } from "@heroui/link";

export default function App({
  academicActivitiesBukti,
  setAcademicActivitiesBukti,
  setIdAcademicActivities,
  idAcademicActivities,
  academicActivities,
  setAcademicActivities,
}: {
  academicActivitiesBukti: any;
  setAcademicActivitiesBukti: any;
  setIdAcademicActivities: any;
  idAcademicActivities: any;
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
            <TableCell>
              {item.buktiUrl === "Tidak Ada" ? (
                "Tidak Ada"
              ) : (
                <Link href={item.buktiUrl} target="_blank">
                  Bukti
                </Link>
              )}
            </TableCell>
            <TableCell>
              <div className="flex flex-row gap-2 justify-end">
                <ModalEdit
                  academicActivitiesBukti={academicActivitiesBukti}
                  setAcademicActivitiesBukti={setAcademicActivitiesBukti}
                  index={index}
                  academicActivity={academicActivities}
                  setAcademicActivity={setAcademicActivities}
                />
                <ModalDelete
                  setIdAcademicActivities={setIdAcademicActivities}
                  idAcademicActivities={idAcademicActivities}
                  academicActivities={academicActivities}
                  setAcademicActivities={setAcademicActivities}
                  index={index}
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
