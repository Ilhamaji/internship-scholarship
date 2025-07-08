"use client";

import React, { useEffect, useState } from "react";
import TabelIpk from "@/components/dashboard/mahasiswa/tabelIPK";
import TabelAkademik from "@/components/dashboard/mahasiswa/tabelAkademik";
import TabelPrestasi from "@/components/dashboard/mahasiswa/tabelPrestasi";
import TabelPanitia from "@/components/dashboard/mahasiswa/tabelPanitia";
import TabelOrganisasi from "@/components/dashboard/mahasiswa/tabelOrganisasi";
import TambahAkademik from "@/components/dashboard/modal/tambahAkademik";
import TambahIPK from "@/components/dashboard/modal/tambahIPK";
import TambahPrestasi from "@/components/dashboard/modal/tambahPrestasi";
import TambahPanitia from "@/components/dashboard/modal/tambahPanitia";
import { Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import getLaporanDetailById from "@/lib/action/getLaporanDetailById";

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);
  const [ipkIps, setIpkIps] = useState();
  const [akademik, setAkademik] = useState();

  const id = "22530001";
  const semesterId = "SM202202";

  useEffect(() => {
    const fungsi = async () => {
      await getLaporanDetailById(setIsLoading, setIpkIps, id, semesterId);
    };

    fungsi();
  }, []);

  if (isLoading) {
    return <div>Loading data...</div>;
  }

  if (!isLoading) {
    return (
      <div className="flex flex-col gap-2 md:gap-4 py-2 md:py-4 px-2 md:px-12 lg:px-36">
        <div className="flex flex-col gap-2 bg-white rounded-xl p-3 lg:p-12">
          <div className="text-xl md:text-2xl font-bold">
            A. LAPORAN KEGIATAN AKADEMIK
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-lg">IPS & IPK</div>
            <TambahIPK ipkIps={ipkIps} setIpkIps={setIpkIps} />
            <TabelIpk ipkIps={ipkIps} />
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-lg">Kegiatan Akademik</div>
            {/* <TambahAkademik akademik={akademik} setAkademik={setAkademik} />
            <TabelAkademik akademik={akademik} /> */}
          </div>
        </div>
        <div className="flex flex-col gap-2 bg-white rounded-xl p-3 lg:p-12">
          <div className="text-xl md:text-2xl font-bold">
            B. LAPORAN KEGIATAN NON AKADEMIK
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-lg">
              Prestasi yang diraih selama semester ini
            </div>
            <TambahPrestasi />
            <TabelPrestasi />
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-lg">Kegiatan organisasi mahasiswa</div>
            <TabelOrganisasi />
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-lg">
              Kegiatan kepanitiaan & penugasan selama satu semester
            </div>
            <TambahPanitia />
            <TabelPanitia />
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-lg">Kegiatan mandiri selama satu semester</div>
            <TambahPrestasi />
            <TabelPrestasi />
          </div>
        </div>

        <div className="flex flex-col gap-2 bg-white rounded-xl p-3 lg:p-12">
          <div className="text-xl md:text-2xl font-bold">C. EVALUASI</div>
          <div className="flex flex-col gap-2">
            <div className="text-lg">Faktor Pendukung</div>
            <Textarea
              isRequired
              size={"lg"}
              placeholder="Enter your description"
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-lg">Faktor Penghambat</div>
            <Textarea
              isRequired
              size={"lg"}
              placeholder="Enter your description"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 bg-white rounded-xl p-3 lg:p-12">
          <div className="text-xl md:text-2xl font-bold">
            D. Target Semester Depan
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-lg">IPS & IPK</div>
            {/* <TambahIPK /> */}
            {/* <TabelIpk /> */}
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-lg">Kegiatan Akademik</div>
            {/* <TambahAkademik /> */}
            {/* <TabelAkademik /> */}
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-lg">
              Prestasi yang diraih selama semester ini
            </div>
            <TambahPrestasi />
            <TabelPrestasi />
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-lg">Kegiatan mandiri selama satu semester</div>
            <TambahPrestasi />
            <TabelPrestasi />
          </div>
        </div>

        {isLoading ? (
          <Button
            isLoading
            color="primary"
            spinner={
              <svg
                className="animate-spin h-5 w-5 text-current"
                fill="none"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  fill="currentColor"
                />
              </svg>
            }
          >
            Loading
          </Button>
        ) : (
          <Button color="primary">Simpan</Button>
        )}
      </div>
    );
  }
}
