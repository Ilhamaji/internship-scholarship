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
  targetIndependentActivities,
  setTargetIndependentActivities,
}: {
  targetIndependentActivities: any;
  setTargetIndependentActivities: any;
}) {
  return (
    <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>NO</TableColumn>
        <TableColumn>NAMA KEGIATAN</TableColumn>
        <TableColumn>KEIKUTSERTAAN</TableColumn>
      </TableHeader>
      <TableBody>
        {targetIndependentActivities?.map((item: any, index: any) => (
          <TableRow key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell className="truncate">{item.activityName}</TableCell>
            <TableCell>{item.participation}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
