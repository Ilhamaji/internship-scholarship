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
  targetNextSemester,
  setTargetNextSemester,
}: {
  targetNextSemester: any;
  setTargetNextSemester: any;
}) {
  return (
    <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>SEMESTER</TableColumn>
        <TableColumn>IPS</TableColumn>
        <TableColumn>IPK</TableColumn>
      </TableHeader>
      <TableBody>
        {targetNextSemester === undefined ||
        targetNextSemester === "" ||
        targetNextSemester === null ? (
          <></>
        ) : (
          <TableRow key={targetNextSemester.semester}>
            <TableCell>{targetNextSemester.semester}</TableCell>
            <TableCell>{targetNextSemester.ipsTarget}</TableCell>
            <TableCell>{targetNextSemester.ipkTarget}</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
