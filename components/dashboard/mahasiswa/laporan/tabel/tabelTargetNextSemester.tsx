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
        {targetNextSemester.length === 0 ||
        targetNextSemester === undefined ||
        targetNextSemester === "" ||
        targetNextSemester === null ? (
          <></>
        ) : (
          targetNextSemester.map((item: any, index: any) => (
            <TableRow key={item.semester}>
              <TableCell>{item.semester}</TableCell>
              <TableCell>{item.ipsTarget}</TableCell>
              <TableCell>{item.ipkTarget}</TableCell>
              <TableCell>
                <div className="flex flex-row gap-2 justify-end">
                  <ModalEdit
                    semester={item.semester}
                    setTargetNextSemester={setTargetNextSemester}
                    targetNextSemester={targetNextSemester}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
