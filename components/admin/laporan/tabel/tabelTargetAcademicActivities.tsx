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
  targetAcademicActivities,
  setTargetAcademicActivities,
}: {
  targetAcademicActivities: any;
  setTargetAcademicActivities: any;
}) {
  return (
    <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>NO</TableColumn>
        <TableColumn>NAMA KEGIATAN</TableColumn>
        <TableColumn>STRATEGI</TableColumn>
      </TableHeader>
      <TableBody>
        {targetAcademicActivities?.map((item: any, index: any) => (
          <TableRow key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell className="truncate">{item.activityName}</TableCell>
            <TableCell>{item.strategy}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
