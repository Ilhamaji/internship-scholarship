import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import ModalEdit from "@/components/dashboard/mahasiswa/laporan/modal/editOrganizationActivities";
import ModalDelete from "@/components/dashboard//mahasiswa/laporan/modal/hapusAcademicActivities";

export default function App({
  organizationActivities,
  setOrganizationActivities,
}: {
  organizationActivities: any;
  setOrganizationActivities: any;
}) {
  return (
    <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>NO</TableColumn>
        <TableColumn>NAMA ORGANISASI</TableColumn>
        <TableColumn>KEIKUTSERTAAN</TableColumn>
        <TableColumn>TINGKAT</TableColumn>
        <TableColumn>BUKTI</TableColumn>
        <TableColumn className="text-end">AKSI</TableColumn>
      </TableHeader>
      <TableBody>
        {organizationActivities?.map((item: any, index: any) => (
          <TableRow key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell className="truncate">{item.ukmName}</TableCell>
            <TableCell>{item.position}</TableCell>
            <TableCell>{item.level}</TableCell>
            <TableCell>{item.buktiUrl}</TableCell>
            <TableCell>
              <div className="flex flex-row gap-2 justify-end">
                <ModalEdit
                  index={index}
                  organizationActivities={organizationActivities}
                  setOrganizationActivities={setOrganizationActivities}
                />
                <ModalDelete />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
