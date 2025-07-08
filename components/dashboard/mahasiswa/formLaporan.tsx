import React from "react";
import TabelIpk from "@/components/dashboard/mahasiswa/tabelIPK";
import TabelAkademik from "@/components/dashboard/mahasiswa/tabelAkademik";
import TambahAkademik from "@/components/dashboard/modal/tambahAkademik";
import TambahIPK from "@/components/dashboard/modal/tambahIPK";

export default function page() {
  return (
    <div className="flex flex-col gap-4 py-4 px-4 md:px-12 lg:px-36">
      <div className="flex flex-col gap-4 bg-white rounded-xl p-4 lg:p-12">
        <div className="text-2xl font-bold">A. LAPORAN KEGIATAN AKADEMIK</div>
        <div className="flex flex-col gap-2">
          <div className="text-xl font-bold ">IPS & IPK</div>
          <TambahIPK />
          <TabelIpk />
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-xl font-bold">Kegiatan Akademik</div>
          <TambahAkademik />
          <TabelAkademik />
        </div>
      </div>
      <div className="flex flex-col gap-4 bg-white rounded-xl p-12">
        <div className="text-2xl font-bold">
          B. LAPORAN KEGIATAN NON AKADEMIK
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-xl font-bold ">IPS & IPK</div>
          <TambahIPK />
          <TabelIpk />
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-xl font-bold">Kegiatan Akademik</div>
          <TambahAkademik />
          <TabelAkademik />
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-xl font-bold">Kegiatan Akademik</div>
          <TambahAkademik />
          <TabelAkademik />
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-xl font-bold">Kegiatan Akademik</div>
          <TambahAkademik />
          <TabelAkademik />
        </div>
      </div>
    </div>
  );
}
