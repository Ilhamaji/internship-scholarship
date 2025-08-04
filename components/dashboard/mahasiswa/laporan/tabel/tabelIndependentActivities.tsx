import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import ModalEdit from "@/components/dashboard/mahasiswa/laporan/modal/editIndependentActivities";
import ModalDelete from "@/components/dashboard//mahasiswa/laporan/modal/hapusIndependentActivities";

export default function App({
  idIndependentActivities,
  setIdIndependentActivities,
  independentActivities,
  setIndependentActivities,
}: {
  idIndependentActivities: any;
  setIdIndependentActivities: any;
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
        <TableColumn>TANGGAL</TableColumn>
        <TableColumn>BUKTI</TableColumn>
        <TableColumn className="text-end">AKSI</TableColumn>
      </TableHeader>
      <TableBody>
        {independentActivities === undefined ||
        independentActivities === null ? (
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
                    independentActivities={independentActivities}
                    setIndependentActivities={setIndependentActivities}
                  />
                  <ModalDelete
                    idIndependentActivities={idIndependentActivities}
                    setIdIndependentActivities={setIdIndependentActivities}
                    index={index}
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
