import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import ModalEdit from "@/components/dashboard/mahasiswa/laporan/modal/editTargetIndependentActivities";
import ModalDelete from "@/components/dashboard/mahasiswa/laporan/modal/hapusTargetIndependentActivities";

export default function App({
  idTargetIndependentActivities,
  setIdTargetIndependentActivities,
  targetIndependentActivities,
  setTargetIndependentActivities,
}: {
  idTargetIndependentActivities: any;
  setIdTargetIndependentActivities: any;
  targetIndependentActivities: any;
  setTargetIndependentActivities: any;
}) {
  return (
    <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>NO</TableColumn>
        <TableColumn>NAMA KEGIATAN</TableColumn>
        <TableColumn>KEIKUTSERTAAN</TableColumn>
        <TableColumn className="text-end">AKSI</TableColumn>
      </TableHeader>
      <TableBody>
        {targetIndependentActivities?.map((item: any, index: any) => (
          <TableRow key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell className="truncate">{item.activityName}</TableCell>
            <TableCell>{item.participation}</TableCell>
            <TableCell>
              <div className="flex flex-row gap-2 justify-end">
                <ModalEdit
                  index={index}
                  targetIndependentActivities={targetIndependentActivities}
                  setTargetIndependentActivities={
                    setTargetIndependentActivities
                  }
                />
                <ModalDelete
                  idTargetIndependentActivities={idTargetIndependentActivities}
                  setIdTargetIndependentActivities={
                    setIdTargetIndependentActivities
                  }
                  index={index}
                  targetIndependentActivities={targetIndependentActivities}
                  setTargetIndependentActivities={
                    setTargetIndependentActivities
                  }
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
