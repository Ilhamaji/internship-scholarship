import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import ModalEdit from "@/components/admin/laporan/modal/komentarIndependentActivities";

export default function App({
  komentarIndependentActivities,
  setKomentarIndependentActivities,
  independentActivities,
  setIndependentActivities,
}: {
  komentarIndependentActivities: any;
  setKomentarIndependentActivities: any;
  independentActivities: any;
  setIndependentActivities: any;
}) {
  return (
    <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>NO</TableColumn>
        <TableColumn>NAMA KEGIATAN</TableColumn>
        <TableColumn>TIPE</TableColumn>
        <TableColumn>TINGKATAN</TableColumn>
        <TableColumn>KEIKUTSERTAAN</TableColumn>
        <TableColumn>TEMPAT</TableColumn>
        <TableColumn>TANGGAL MULAI</TableColumn>
        <TableColumn>TANGGAL SELESAI</TableColumn>
        <TableColumn>BUKTI</TableColumn>
        <TableColumn className="text-end">AKSI</TableColumn>
      </TableHeader>
      <TableBody>
        {independentActivities === undefined ? (
          <></>
        ) : (
          independentActivities.map((item: any, index: any) => (
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
                  <ModalEdit
                    index={index}
                    komentarIndependentActivities={
                      komentarIndependentActivities
                    }
                    setKomentarIndependentActivities={
                      setKomentarIndependentActivities
                    }
                    independentActivities={independentActivities}
                    setIndependentActivities={setIndependentActivities}
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
