import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import ModalKomentar from "@/components/admin/laporan/modal/komentarCommitteeActivities";

export default function App({
  komentarCommitteeActivities,
  setKomentarCommitteeActivities,
  committeeActivities,
  setCommitteeActivities,
}: {
  komentarCommitteeActivities: any;
  setKomentarCommitteeActivities: any;
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
        <TableColumn>TANGGAL MULAI</TableColumn>
        <TableColumn>TANGGAL SELESAI</TableColumn>
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
            <TableCell>{item.startDate}</TableCell>
            <TableCell>{item.endDate}</TableCell>
            <TableCell>{item.buktiUrl}</TableCell>
            <TableCell>
              <div className="flex flex-row gap-2 justify-end">
                <ModalKomentar
                  index={index}
                  komentarCommitteeActivities={komentarCommitteeActivities}
                  setKomentarCommitteeActivities={
                    setKomentarCommitteeActivities
                  }
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
