import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import ModalEdit from "@/components/dashboard/modal/edit";
import ModalDelete from "@/components/dashboard/modal/delete";

export default function App({ ipkIps }: { ipkIps: any }) {
  return (
    <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>IPS</TableColumn>
        <TableColumn>IPK</TableColumn>
        <TableColumn className="text-end">AKSI</TableColumn>
      </TableHeader>
      <TableBody>
        <TableRow key="1">
          <TableCell>{ipkIps.ips}</TableCell>
          <TableCell>{ipkIps.ipk}</TableCell>
          <TableCell>
            <div className="flex flex-row gap-2 justify-end">
              <ModalEdit />
              <ModalDelete />
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
