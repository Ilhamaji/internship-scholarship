import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import ModalEdit from "@/components/dashboard/mahasiswa/laporan/modal/editStudentsAchievements";
import ModalDelete from "@/components/dashboard/mahasiswa/laporan/modal/hapusStudentsAchievements";
import { Link } from "@heroui/link";

export default function App({
  studentAchievementsBukti,
  setStudentAchievementsBukti,
  idStudentAchievements,
  setIdStudentAchievements,
  studentsAchievements,
  setStudentsAchievements,
}: {
  studentAchievementsBukti: any;
  setStudentAchievementsBukti: any;
  idStudentAchievements: any;
  setIdStudentAchievements: any;
  studentsAchievements: any;
  setStudentsAchievements: any;
}) {
  return (
    <Table aria-label="Example static collection table" isStriped>
      <TableHeader>
        <TableColumn>NO</TableColumn>
        <TableColumn>NAMA PRESTASI</TableColumn>
        <TableColumn>PERINGKAT</TableColumn>
        <TableColumn>TINGKAT</TableColumn>
        <TableColumn>SCOPE</TableColumn>
        <TableColumn>TIM/INDIVIDU</TableColumn>
        <TableColumn>TANGGAL MULAI</TableColumn>
        <TableColumn>TANGGAL BERAKHIR</TableColumn>
        <TableColumn>TEMPAT</TableColumn>
        <TableColumn>BUKTI</TableColumn>
        <TableColumn className="text-end">AKSI</TableColumn>
      </TableHeader>
      <TableBody>
        {studentsAchievements?.map((item: any, index: any) => {
          const startParts = item.startDate.split("-");
          const endParts = item.endDate.split("-");
          const startDay = startParts[2];
          const startMonth = startParts[1];
          const startYear = startParts[0];
          const endDay = endParts[2];
          const endMonth = endParts[1];
          const endYear = endParts[0];

          const startDate = `${startDay}-${startMonth}-${startYear}`;
          const endDate = `${endDay}-${endMonth}-${endYear}`;

          return (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell className="truncate">
                {item.achievementsName}
              </TableCell>
              <TableCell>{item.award}</TableCell>
              <TableCell>{item.level}</TableCell>
              <TableCell>{item.scope}</TableCell>
              <TableCell>{item.isGroup ? "Tim" : "Individu"}</TableCell>
              <TableCell>{startDate}</TableCell>
              <TableCell>{endDate}</TableCell>
              <TableCell>{item.place}</TableCell>
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
                    studentAchievementsBukti={studentAchievementsBukti}
                    setStudentAchievementsBukti={setStudentAchievementsBukti}
                    index={index}
                    studentsAchievements={studentsAchievements}
                    setStudentsAchievements={setStudentsAchievements}
                  />
                  <ModalDelete
                    idStudentAchievements={idStudentAchievements}
                    setIdStudentAchievements={setIdStudentAchievements}
                    index={index}
                    studentsAchievements={studentsAchievements}
                    setStudentsAchievements={setStudentsAchievements}
                  />
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
