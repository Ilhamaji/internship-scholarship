import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import ModalEdit from "@/components/dashboard/mahasiswa/laporan/modal/editTargetAcademicActivities";
import ModalDelete from "@/components/dashboard/mahasiswa/laporan/modal/hapusTargetAcademicActivities";

export default function App({
  idTargetAcademicActivities,
  setIdTargetAcademicActivities,
  targetAcademicActivities,
  setTargetAcademicActivities,
}: {
  idTargetAcademicActivities: any;
  setIdTargetAcademicActivities: any;
  targetAcademicActivities: any;
  setTargetAcademicActivities: any;
}) {
  return (
    <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>NO</TableColumn>
        <TableColumn>NAMA KEGIATAN</TableColumn>
        <TableColumn>STRATEGI</TableColumn>
        <TableColumn className="text-end">AKSI</TableColumn>
      </TableHeader>
      <TableBody>
        {targetAcademicActivities?.map((item: any, index: any) => (
          <TableRow key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell className="truncate">{item.activityName}</TableCell>
            <TableCell>{item.strategy}</TableCell>
            <TableCell>
              <div className="flex flex-row gap-2 justify-end">
                <ModalEdit
                  index={index}
                  targetAcademicActivities={targetAcademicActivities}
                  setTargetAcademicActivities={setTargetAcademicActivities}
                />
                <ModalDelete
                  idTargetAcademicActivities={idTargetAcademicActivities}
                  setIdTargetAcademicActivities={setIdTargetAcademicActivities}
                  index={index}
                  targetAcademicActivities={targetAcademicActivities}
                  setTargetAcademicActivities={setTargetAcademicActivities}
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
