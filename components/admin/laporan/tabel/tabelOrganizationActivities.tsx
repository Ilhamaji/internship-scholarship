import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import ModalEdit from "@/components/admin/laporan/modal/komentarOrganizationActivities";

export default function App({
  komentarOrganizationActivities,
  setKomentarOrganizationActivities,
  organizationActivities,
  setOrganizationActivities,
}: {
  komentarOrganizationActivities: any;
  setKomentarOrganizationActivities: any;
  organizationActivities: any;
  setOrganizationActivities: any;
}) {
  return (
    <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>NO</TableColumn>
        <TableColumn>NAMA ORGANISASI</TableColumn>
        <TableColumn>NAMA KEGIATAN</TableColumn>
        <TableColumn>KEIKUTSERTAAN</TableColumn>
        <TableColumn>TINGKAT</TableColumn>
        <TableColumn>TANGGAL MULAI</TableColumn>
        <TableColumn>TANGGAL SELESAI</TableColumn>
        <TableColumn className="text-end">AKSI</TableColumn>
      </TableHeader>
      <TableBody>
        {organizationActivities?.map((item: any, index: any) => (
          <TableRow key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell className="truncate">{item.ukmName}</TableCell>
            <TableCell className="truncate">{item.activityName}</TableCell>
            <TableCell>{item.position}</TableCell>
            <TableCell>{item.level}</TableCell>
            <TableCell>{item.startDate}</TableCell>
            <TableCell>{item.endDate}</TableCell>
            <TableCell>
              <div className="flex flex-row gap-2 justify-end">
                <ModalEdit
                  index={index}
                  komentarOrganizationActivities={
                    komentarOrganizationActivities
                  }
                  setKomentarOrganizationActivities={
                    setKomentarOrganizationActivities
                  }
                  organizationActivities={organizationActivities}
                  setOrganizationActivities={setOrganizationActivities}
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
