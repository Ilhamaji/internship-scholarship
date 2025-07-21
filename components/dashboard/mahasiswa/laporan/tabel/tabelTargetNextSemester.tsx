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
import ModalDelete from "@/components/dashboard/modal/delete";

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
        {targetNextSemester.semester === null &&
        targetNextSemester.ipsTarget === null &&
        targetNextSemester.ipkTarget === null ? (
          <></>
        ) : (
          <TableRow key="1">
            <TableCell>{targetNextSemester.semester}</TableCell>
            <TableCell>{targetNextSemester.ipsTarget}</TableCell>
            <TableCell>{targetNextSemester.ipkTarget}</TableCell>
            <TableCell>
              <div className="flex flex-row gap-2 justify-end">
                <ModalEdit
                  setTargetNextSemester={setTargetNextSemester}
                  targetNextSemester={targetNextSemester}
                />
                <ModalDelete />
              </div>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
