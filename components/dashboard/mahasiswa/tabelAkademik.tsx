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

export const columns = [
  { name: "NO", uid: "no" },
  { name: "TANGGAL MULAI", uid: "tglmulai" },
  { name: "TANGGAL BERAKHIR", uid: "tglakhir" },
  { name: "TEMPAT", uid: "tempat" },
  { name: "BUKTI", uid: "bukti" },
  { name: "AKSI", uid: "aksi" },
];

export default function App({ akademik }: { akademik: any }) {
  const renderCell = React.useCallback((akademik: any, columnKey: any) => {
    const cellValue = akademik[columnKey];

    switch (columnKey) {
      case "no":
        return <p>{akademik.key}</p>;
      case "nama":
        return <p>{akademik.nama}</p>;
      case "tglMulai":
        return <p>{akademik.tglMulai}</p>;
      case "tglAkhir":
        return <p>{akademik.tglAkhir}</p>;
      case "tempat":
        return <p>{akademik.tempat}</p>;
      case "bukti":
        return <p>{akademik.bukti}</p>;
      case "aksi":
        return (
          <div className="flex flex-row gap-2 justify-end my-auto">
            <ModalEdit />
            <ModalDelete />
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table aria-label="Example table with custom cells">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "aksi" ? "end" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"Tabel Kosong."} items={akademik}>
        {(item) => (
          <TableRow>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
