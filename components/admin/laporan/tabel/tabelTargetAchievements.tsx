import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";

export default function App({
  targetAchievements,
  setTargetAchievements,
}: {
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
      </TableHeader>
      <TableBody>
        {targetAchievements?.map((item: any, index: any) => (
          <TableRow key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell className="truncate">{item.achievementsName}</TableCell>
            <TableCell>{item.level}</TableCell>
            <TableCell>{item.award}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
