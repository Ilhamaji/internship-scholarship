import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import ModalEdit from "@/components/dashboard/mahasiswa/laporan/modal/editCommitteeActivities";
import ModalDelete from "@/components/dashboard//mahasiswa/laporan/modal/hapusCommitteeActivities";

export default function App({
  idCommitteeActivities,
  setIdCommitteeActivities,
  committeeActivities,
  setCommitteeActivities,
}: {
  idCommitteeActivities: any;
  setIdCommitteeActivities: any;
  committeeActivities: any;
  setCommitteeActivities: any;
}) {
  return (
    <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>NO</TableColumn>
        <TableColumn>NAMA KEGIATAN</TableColumn>
        <TableColumn>JENIS</TableColumn>
        <TableColumn>TINGKATAN</TableColumn>
        <TableColumn>KEIKUTSERTAAN</TableColumn>
        <TableColumn>TEMPAT</TableColumn>
        <TableColumn>TANGGAL</TableColumn>
        <TableColumn>BUKTI</TableColumn>
        <TableColumn className="text-end">AKSI</TableColumn>
      </TableHeader>
      <TableBody>
        {committeeActivities?.map((item: any, index: any) => (
          <TableRow key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{item.activityName}</TableCell>
            <TableCell>{item.activityType}</TableCell>
            <TableCell>{item.level}</TableCell>
            <TableCell>{item.participation}</TableCell>
            <TableCell>{item.place}</TableCell>
            <TableCell>
              {item.startDate || item.endtDate
                ? item.startDate + " - " + item.endDate
                : "Tidak Ada"}
            </TableCell>
            <TableCell>{item.buktiUrl}</TableCell>
            <TableCell>
              <div className="flex flex-row gap-2 justify-end">
                <ModalEdit
                  index={index}
                  committeeActivities={committeeActivities}
                  setCommitteeActivities={setCommitteeActivities}
                />
                <ModalDelete
                  idCommitteeActivities={idCommitteeActivities}
                  setIdCommitteeActivities={setIdCommitteeActivities}
                  index={index}
                  committeeActivities={committeeActivities}
                  setCommitteeActivities={setCommitteeActivities}
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
