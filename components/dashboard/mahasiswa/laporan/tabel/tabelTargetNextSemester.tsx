import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import ModalEdit from "@/components/dashboard/mahasiswa/laporan/modal/editTargetNextSemester";

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
        <TableColumn className="text-end">AKSI</TableColumn>
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
            <TableCell>
              <div className="flex flex-row gap-2 justify-end">
                <ModalEdit
                  semester={targetNextSemester.semester}
                  setTargetNextSemester={setTargetNextSemester}
                  targetNextSemester={targetNextSemester}
                />
              </div>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
