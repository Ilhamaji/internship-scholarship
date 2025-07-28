import React from "react";
import TabelLaporan from "@/components/admin/tabel/tabelLaporan";
import TabelUser from "@/components/admin/tabel/tabelUser";

export default function page() {
  return (
    <div>
      <TabelLaporan />
      <TabelUser />
    </div>
  );
}
