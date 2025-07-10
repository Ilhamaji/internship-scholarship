"use client";

import React, { useEffect, useState } from "react";
import TabelAcademicReports from "@/components/dashboard/mahasiswa/laporan/tabel/tabelAcademicReports";
import TabelAcademicActivities from "@/components/dashboard/mahasiswa/laporan/tabel/tabelAcademicActivities";
import TambahAcademicActivities from "@/components/dashboard/mahasiswa/laporan/modal/tambahAcademicActivities";
import TabelStudentsAchievements from "@/components/dashboard/mahasiswa/laporan/tabel/tabelStudentsAchievements";
import TambahStudentsAchievements from "@/components/dashboard/mahasiswa/laporan/modal/tambahStudentsAchievements";
import TambahOrganizationActivities from "@/components/dashboard/mahasiswa/laporan/modal/tambahOrganizationActivities";
import TabelOrganizationActivities from "@/components/dashboard/mahasiswa/laporan/tabel/tabelOrganizationActivities";
import TabelCommitteeActivities from "@/components/dashboard/mahasiswa/laporan/tabel/tabelCommitteeActivities";
import TambahCommitteActivities from "@/components/dashboard/mahasiswa/laporan/modal/tambahCommitteActivities";
import TabelIndependentActivities from "@/components/dashboard/mahasiswa/laporan/tabel/tabelIndependentActivities";
import TambahIndependentActivities from "@/components/dashboard/mahasiswa/laporan/modal/tambahIndependentActivities";
import { Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import api from "@/lib/axiosInstance";
import { useParams } from "next/navigation";
import { Spinner } from "@heroui/spinner";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [academicReports, setAcademicReports] = useState();
  const [academicActivities, setAcademicActivities] = useState();
  const [studentsAchievements, setStudentsAchievements] = useState();
  const [organizationActivities, setOrganizationActivities] = useState();
  const [committeeActivities, setCommitteeActivities] = useState();
  const [independentActivities, setIndependentActivities] = useState();
  const params = useParams<{ laporanId: string }>();

  useEffect(() => {
    const getLaporan = async () => {
      const res = await api.get(`/monev/detail/${params.laporanId}`);
      setAcademicReports(res.data.data.detailLaporan.academicReports[0]);
      console.log(res.data.data.detailLaporan);

      if (
        res.data.data.detailLaporan.academicActivities[0].activityName !==
        "Tidak Ada"
      ) {
        setAcademicActivities(res.data.data.detailLaporan.academicActivities);
      }

      if (
        res.data.data.detailLaporan.studentsAchievements[0].achievementsName !==
        "Tidak Ada"
      ) {
        setStudentsAchievements(
          res.data.data.detailLaporan.studentsAchievements
        );
      }

      if (
        res.data.data.detailLaporan.organizationActivities[0].ukmName !==
        "Tidak Ada"
      ) {
        setOrganizationActivities(
          res.data.data.detailLaporan.organizationActivities
        );
      }

      if (
        res.data.data.detailLaporan.committeeActivities[0].activityName !==
        "Tidak Ada"
      ) {
        setCommitteeActivities(res.data.data.detailLaporan.comitteeActivities);
      }

      if (
        res.data.data.detailLaporan.independentActivities[0].activityName !==
        "Tidak Ada"
      ) {
        setIndependentActivities(
          res.data.data.detailLaporan.independentActivities
        );
      }

      setLoading(false);
    };

    getLaporan();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (!loading) {
    return (
      <div className="flex flex-col gap-2 md:gap-4 py-2 md:py-4 px-2 md:px-6 lg:px-36">
        <div className="flex flex-col gap-2 bg-white rounded-xl p-3 lg:p-12">
          <div className="text-xl md:text-2xl font-bold">
            A. LAPORAN KEGIATAN AKADEMIK
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-lg">IPS & IPK</div>
            <TabelAcademicReports
              setAcademicReports={setAcademicReports}
              academicReports={academicReports}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-lg">Kegiatan Akademik</div>
            <TambahAcademicActivities
              setAcademicActivities={setAcademicActivities}
              academicActivities={academicActivities}
            />
            <TabelAcademicActivities
              setAcademicActivities={setAcademicActivities}
              academicActivities={academicActivities}
            />
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
            <TambahStudentsAchievements
              setStudentsAchievements={setStudentsAchievements}
              studentsAchievements={studentsAchievements}
            />
            <TabelStudentsAchievements
              setStudentsAchievements={setStudentsAchievements}
              studentsAchievements={studentsAchievements}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-lg">Kegiatan organisasi mahasiswa</div>
            <TambahOrganizationActivities
              organizationActivities={organizationActivities}
              setOrganizationActivities={setOrganizationActivities}
            />
            <TabelOrganizationActivities
              organizationActivities={organizationActivities}
              setOrganizationActivities={setOrganizationActivities}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-lg">
              Kegiatan kepanitiaan & penugasan selama satu semester
            </div>
            <TambahCommitteActivities
              committeeActivities={committeeActivities}
              setCommitteeActivities={setCommitteeActivities}
            />
            <TabelCommitteeActivities
              committeeActivities={committeeActivities}
              setCommitteeActivities={setCommitteeActivities}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-lg">Kegiatan mandiri selama satu semester</div>
            <TambahIndependentActivities
              independentActivities={independentActivities}
              setIndependentActivities={setIndependentActivities}
            />
            <TabelIndependentActivities
              independentActivities={independentActivities}
              setIndependentActivities={setIndependentActivities}
            />

            {/* <TabelPrestasi /> */}
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
            {/* <TambahPrestasi /> */}
            {/* <TabelPrestasi /> */}
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-lg">Kegiatan mandiri selama satu semester</div>
            {/* <TambahPrestasi /> */}
            {/* <TabelPrestasi /> */}
          </div>
        </div>

        {loading ? (
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
