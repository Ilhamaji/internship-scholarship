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
import TambahTargetNextSemester from "@/components/dashboard/mahasiswa/laporan/modal/tambahTargetNextSemester";
import TabelTargetNextSemester from "@/components/dashboard/mahasiswa/laporan/tabel/tabelTargetNextSemester";
import TambahTargetAcademicActivities from "@/components/dashboard/mahasiswa/laporan/modal/tambahTargetAcademicActivities";
import TabelTargetAcademicActivities from "@/components/dashboard/mahasiswa/laporan/tabel/tabelTargetAcademicActivities";
import TambahTargetAchievements from "@/components/dashboard/mahasiswa/laporan/modal/tambahTargetAchievements";
import TabelTargetAchievements from "@/components/dashboard/mahasiswa/laporan/tabel/tabelTargetAchievements";
import TambahTargetIndependentActivities from "@/components/dashboard/mahasiswa/laporan/modal/tambahTargetIndependentActivities";
import TabelTargetIndependentActivities from "@/components/dashboard/mahasiswa/laporan/tabel/tabelTargetIndependentActivities";
import { Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import api from "@/lib/axiosInstance";
import { useParams } from "next/navigation";
import { Spinner } from "@heroui/spinner";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [academicReports, setAcademicReports] = useState();
  const [semester, setSemester] = useState();
  const [academicActivities, setAcademicActivities] = useState();
  const [studentsAchievements, setStudentsAchievements] = useState();
  const [organizationActivities, setOrganizationActivities] = useState();
  const [committeeActivities, setCommitteeActivities] = useState();
  const [independentActivities, setIndependentActivities] = useState();
  const [supportFactors, setSupportFactors] = useState("");
  const [barrierFactors, setBarrierFactors] = useState("");
  const [studentEvaluations, setStudentEvaluations] = useState();
  const [targetNextSemester, setTargetNextSemester] = useState();
  const [targetAcademicActivities, setTargetAcademicActivities] = useState();
  const [targetAchievements, setTargetAchievements] = useState();
  const [targetIndependentActivities, setTargetIndependentActivities] =
    useState();
  const [fullData, setFullData] = useState();

  const params = useParams<{ laporanId: string }>();

  useEffect(() => {
    const getLaporan = async () => {
      const res = await api.get(`/monev/detail/${params.laporanId}`);
      setFullData(res.data.data.detailLaporan);
      setAcademicReports(res.data.data.detailLaporan.academicReports[0]);
      setTargetNextSemester(res.data.data.detailLaporan.targetNextSemester);
      setSemester(res.data.data.detailLaporan.academicReports[0].semester);

      console.log(res.data.data.detailLaporan);

      if (res.data.data.detailLaporan.academicActivities[0]) {
        if (
          res.data.data.detailLaporan.academicActivities[0].activityName !==
            "" ||
          res.data.data.detailLaporan.academicActivities[0].activityName !==
            null
        ) {
          setAcademicActivities(res.data.data.detailLaporan.academicActivities);
        }
      } else {
        console.log("Tidak ada data kegiatan akademik");
      }

      if (res.data.data.detailLaporan.studentsAchievements[0]) {
        if (
          res.data.data.detailLaporan.studentsAchievements[0]
            .achievementsName !== "" ||
          res.data.data.detailLaporan.studentsAchievements[0]
            .achievementsName !== null
        ) {
          setStudentsAchievements(
            res.data.data.detailLaporan.studentsAchievements
          );
        }
      } else {
        console.log("Tidak ada data prestasi mahasiswa");
      }

      if (res.data.data.detailLaporan.organizationActivities[0]) {
        if (
          res.data.data.detailLaporan.organizationActivities[0].ukmName !==
            "" ||
          res.data.data.detailLaporan.organizationActivities[0].ukmName !== null
        ) {
          setOrganizationActivities(
            res.data.data.detailLaporan.organizationActivities
          );
        }
      } else {
        console.log("Tidak ada data kegiatan organisasi");
      }

      if (res.data.data.detailLaporan.committeeActivities[0]) {
        if (
          res.data.data.detailLaporan.committeeActivities[0].activityName !==
            "" ||
          res.data.data.detailLaporan.committeeActivities[0].activityName !==
            null
        ) {
          setCommitteeActivities(
            res.data.data.detailLaporan.committeeActivities
          );
        }
      } else {
        console.log("Tidak ada data kegiatan kepanitiaan");
      }

      if (res.data.data.detailLaporan.independentActivities[0]) {
        if (
          res.data.data.detailLaporan.independentActivities[0].activityName !==
            "" ||
          res.data.data.detailLaporan.independentActivities[0].activityName !==
            null
        ) {
          setIndependentActivities(
            res.data.data.detailLaporan.independentActivities
          );
        }
      } else {
        console.log("Tidak ada data kegiatan mandiri");
      }

      if (res.data.data.detailLaporan.studentEvaluations[0]) {
        if (
          (res.data.data.detailLaporan.studentEvaluations[0].supportFactors !==
            "" &&
            res.data.data.detailLaporan.studentEvaluations[0].barrierFactors !==
              "") ||
          (res.data.data.detailLaporan.studentEvaluations[0].supportFactors !==
            null &&
            res.data.data.detailLaporan.studentEvaluations[0].barrierFactors !==
              null)
        ) {
          setStudentEvaluations(
            res.data.data.detailLaporan.studentEvaluations[0]
          );
        }
      } else {
        console.log("Tidak ada data evaluasi mahasiswa");
      }

      if (res.data.data.detailLaporan.targetAcademicActivities[0]) {
        if (
          (res.data.data.detailLaporan.targetAcademicActivities[0]
            .activityName !== "" &&
            res.data.data.detailLaporan.targetAcademicActivities[0].strategy !==
              "") ||
          (res.data.data.detailLaporan.targetAcademicActivities[0]
            .activityName !== null &&
            res.data.data.detailLaporan.targetAcademicActivities[0].strategy !==
              null)
        ) {
          setTargetAcademicActivities(
            res.data.data.detailLaporan.targetAcademicActivities
          );
        }
      } else {
        console.log("Tidak ada data target aktivitas akademik");
      }

      if (res.data.data.detailLaporan.targetAchievements[0]) {
        if (
          (res.data.data.detailLaporan.targetAchievements[0]
            .achievementsName !== "" &&
            res.data.data.detailLaporan.targetAchievements[0].award !== "" &&
            res.data.data.detailLaporan.targetAchievements[0].level !== "") ||
          (res.data.data.detailLaporan.targetAchievements[0]
            .achievementsName !== null &&
            res.data.data.detailLaporan.targetAchievements[0].award !== null &&
            res.data.data.detailLaporan.targetAchievements[0].level !== null)
        ) {
          setTargetAchievements(res.data.data.detailLaporan.targetAchievements);
        }
      } else {
        console.log("Tidak ada data target pencapaian");
      }

      if (res.data.data.detailLaporan.targetIndependentActivities[0]) {
        if (
          (res.data.data.detailLaporan.targetIndependentActivities[0]
            .activityName !== "" &&
            res.data.data.detailLaporan.targetIndependentActivities[0]
              .participation !== "") ||
          (res.data.data.detailLaporan.targetIndependentActivities[0]
            .activityName !== null &&
            res.data.data.detailLaporan.targetIndependentActivities[0]
              .participation !== null)
        ) {
          setTargetIndependentActivities(
            res.data.data.detailLaporan.targetIndependentActivities
          );
        }
      } else {
        console.log("Tidak ada data target aktivitas mandiri");
      }

      if (res.data.data.detailLaporan.studentEvaluations[0]) {
        if (
          (res.data.data.detailLaporan.studentEvaluations[0].supportFactors !==
            "" &&
            res.data.data.detailLaporan.studentEvaluations[0].barrierFactors !==
              "") ||
          (res.data.data.detailLaporan.studentEvaluations[0].barrierFactors !==
            null &&
            res.data.data.detailLaporan.studentEvaluations[0].supportFactors !==
              null)
        ) {
          setStudentEvaluations(res.data.data.detailLaporan.studentEvaluations);
        }
      } else {
        console.log("Tidak ada data target aktivitas mandiri");
      }

      setLoading(false);
    };

    getLaporan();
  }, []);

  const saveData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      academicReports,
      academicActivities,
      studentsAchievements,
      organizationActivities,
      committeeActivities,
      independentActivities,
      studentEvaluations: {
        supportFactors,
        barrierFactors,
      },
      targetNextSemester,
      targetAcademicActivities,
      targetAchievements,
      targetIndependentActivities,
    };

    const stringData = JSON.stringify(data);

    const formData = new FormData();
    formData.append("dataMonev", stringData);

    // Jika ada file, tambahkan juga
    // formData.append("academicReports_bukti", file);

    try {
      const response = await api.patch(
        `/monev/draft/${params.laporanId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error adding report:", error);
    } finally {
      setLoading(false);
    }
  };

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
          </div>
        </div>

        <div className="flex flex-col gap-2 bg-white rounded-xl p-3 lg:p-12">
          <div className="text-xl md:text-2xl font-bold">C. EVALUASI</div>
          <div className="flex flex-col gap-2">
            <div className="text-lg">Faktor Pendukung</div>
            <Textarea
              isRequired
              size={"lg"}
              placeholder="Jelaskan faktor pendukung anda"
              onChange={(e) => setSupportFactors(e.target.value)}
              defaultValue={studentEvaluations?.supportFactors}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-lg">Faktor Penghambat</div>
            <Textarea
              isRequired
              size={"lg"}
              placeholder="Jelaskan faktor penghambat anda"
              onChange={(e) => setBarrierFactors(e.target.value)}
              defaultValue={studentEvaluations?.barrierFactors}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 bg-white rounded-xl p-3 lg:p-12">
          <div className="text-xl md:text-2xl font-bold">
            D. Target Semester Depan
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-lg">IPS & IPK</div>
            {targetNextSemester.length > 0 ? (
              <></>
            ) : (
              <TambahTargetNextSemester
                semester={semester}
                setTargetNextSemester={setTargetNextSemester}
              />
            )}
            <TabelTargetNextSemester
              targetNextSemester={targetNextSemester}
              setTargetNextSemester={setTargetNextSemester}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-lg">Kegiatan Akademik</div>
            <TambahTargetAcademicActivities
              targetAcademicActivities={targetAcademicActivities}
              setTargetAcademicActivities={setTargetAcademicActivities}
            />
            <TabelTargetAcademicActivities
              targetAcademicActivities={targetAcademicActivities}
              setTargetAcademicActivities={setTargetAcademicActivities}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-lg">
              Prestasi yang diraih selama semester ini
            </div>
            <TambahTargetAchievements
              targetAchievements={targetAchievements}
              setTargetAchievements={setTargetAchievements}
            />
            <TabelTargetAchievements
              targetAchievements={targetAchievements}
              setTargetAchievements={setTargetAchievements}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-lg">Kegiatan mandiri selama satu semester</div>
            <TambahTargetIndependentActivities
              targetIndependentActivities={targetIndependentActivities}
              setTargetIndependentActivities={setTargetIndependentActivities}
            />
            <TabelTargetIndependentActivities
              targetIndependentActivities={targetIndependentActivities}
              setTargetIndependentActivities={setTargetIndependentActivities}
            />
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
          <Button color="primary" onClick={(e: any) => saveData(e)}>
            Simpan
          </Button>
        )}
      </div>
    );
  }
}
