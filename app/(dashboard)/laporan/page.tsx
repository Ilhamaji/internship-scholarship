import React from "react";
import ProfilTabel from "@/components/profileTable";

export default function page() {
  return (
    <div className="px-36">
      <div className="bg-white rounded-xl p-12 my-4">
        <div className="text-xl font-bold">IPK & IPS</div>
        <ProfilTabel />
        <div className="text-xl font-bold">Kegiatan Organisasi</div>
        <ProfilTabel />
      </div>
    </div>
  );
}
