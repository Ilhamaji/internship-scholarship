import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import ModalEdit from "@/components/dashboard/mahasiswa/laporan/modal/editTargetAchievements";
import ModalDelete from "@/components/dashboard/mahasiswa/laporan/modal/hapusTargetAchievements";

export default function App({
  idTargetAchievements,
  setIdTargetAchievements,
  targetAchievements,
  setTargetAchievements,
}: {
  idTargetAchievements: any;
  setIdTargetAchievements: any;
  targetAchievements: any;
  setTargetAchievements: any;
}) {
  return (
    <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>NO</TableColumn>
        <TableColumn>NAMA PRESTASI</TableColumn>
        <TableColumn>TINGKAT</TableColumn>
        <TableColumn>RAIHAN</TableColumn>
        <TableColumn className="text-end">AKSI</TableColumn>
      </TableHeader>
      <TableBody>
        {targetAchievements?.map((item: any, index: any) => (
          <TableRow key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell className="truncate">{item.achievementsName}</TableCell>
            <TableCell>{item.level}</TableCell>
            <TableCell>{item.award}</TableCell>
            <TableCell>
              <div className="flex flex-row gap-2 justify-end">
                <ModalEdit
                  index={index}
                  targetAchievements={targetAchievements}
                  setTargetAchievements={setTargetAchievements}
                />
                <ModalDelete
                  idTargetAchievements={idTargetAchievements}
                  setIdTargetAchievements={setIdTargetAchievements}
                  index={index}
                  targetAchievements={targetAchievements}
                  setTargetAchievements={setTargetAchievements}
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
