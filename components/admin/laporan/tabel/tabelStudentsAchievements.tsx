import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import ModalEdit from "@/components/admin/laporan/modal/komentarStudentsAchievements";

export default function App({
  komentarStudentsAchievements,
  setKomentarStudentsAchievements,
  studentsAchievements,
  setStudentsAchievements,
}: {
  komentarStudentsAchievements: any;
  setKomentarStudentsAchievements: any;
  studentsAchievements: any;
  setStudentsAchievements: any;
}) {
  return (
    <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>NO</TableColumn>
        <TableColumn>NAMA PRESTASI</TableColumn>
        <TableColumn>PERINGKAT</TableColumn>
        <TableColumn>TINGKAT</TableColumn>
        <TableColumn>SCOPE</TableColumn>
        <TableColumn>TIM/INDIVIDU</TableColumn>
        <TableColumn>TEMPAT</TableColumn>
        <TableColumn>TANGGAL MULAI</TableColumn>
        <TableColumn>TANGGAL SELESAI</TableColumn>
        <TableColumn>BUKTI</TableColumn>
        <TableColumn className="text-end">AKSI</TableColumn>
      </TableHeader>
      <TableBody>
        {studentsAchievements?.map((item: any, index: any) => (
          <TableRow key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell className="truncate">{item.achievementsName}</TableCell>
            <TableCell>{item.award}</TableCell>
            <TableCell>{item.level}</TableCell>
            <TableCell>{item.scope}</TableCell>
            <TableCell>{item.isGroup ? "Tim" : "Individu"}</TableCell>
            <TableCell>{item.place}</TableCell>
            <TableCell>{item.startDate}</TableCell>
            <TableCell>{item.endDate}</TableCell>
            <TableCell>{item.buktiUrl}</TableCell>
            <TableCell>
              <div className="flex flex-row gap-2 justify-end">
                <ModalEdit
                  index={index}
                  komentarStudentsAchievements={komentarStudentsAchievements}
                  setKomentarStudentsAchievements={
                    setKomentarStudentsAchievements
                  }
                  studentsAchievements={studentsAchievements}
                  setStudentsAchievements={setStudentsAchievements}
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
