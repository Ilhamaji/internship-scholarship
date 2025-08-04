import React from "react";
import TabelLaporan from "@/components/admin/root/tabel/tabelLaporan";
import TabelUser from "@/components/admin/root/tabel/tabelUser";

export default function page() {
  return (
    <div className="px-4 md:px-6 xl:px-36 flex flex-col md:flex-row gap-4 py-4">
      <TabelUser />
      <TabelLaporan />
    </div>
  );
}
