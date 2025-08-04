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
import SupportFactorsTextArea from "@/components/dashboard/mahasiswa/laporan/textAreaSupportFactors";
import BarrierFactorsTextArea from "@/components/dashboard/mahasiswa/laporan/textAreaBarrierFactors";
import Pengajuan from "@/components/dashboard/mahasiswa/laporan/modal/pengajuan";
import { Input, Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import api from "@/lib/axiosInstance";
import { useParams } from "next/navigation";
import { Alert } from "@heroui/alert";
import TabelSkeleton from "@/components/dashboard/mahasiswa/laporan/skeleton/tabelSkeleton";
import { Spinner } from "@heroui/spinner";

export default function Page() {
  const [idAcademicActivities, setIdAcademicActivities] = useState([]);
  const [idOrganizationActivities, setIdOrganizationActivities] = useState([]);
  const [idStudentAchievements, setIdStudentAchievements] = useState([]);
  const [idCommitteeActivities, setIdCommitteeActivities] = useState([]);
  const [idIndependentActivities, setIdIndependentActivities] = useState([]);
  const [idTargetAcademicActivities, setIdTargetAcademicActivities] = useState(
    []
  );
  const [idTargetAchievements, setIdTargetAchievements] = useState([]);
  const [idTargetIndependentActivities, setIdTargetIndependentActivities] =
    useState([]);
  const [academicReportsBukti, setAcademicReportsBukti] = useState(null);
  const [academicActivitiesBukti, setAcademicActivitiesBukti] = useState(null);
  const [organizationActivitiesBukti, setOrganizationActivitiesBukti] =
    useState(null);
  const [committeeActivitiesBukti, setCommitteeActivitiesBukti] =
    useState(null);
  const [independentActivitiesBukti, setIndependentActivitiesBukti] =
    useState(null);
  const [studentAchievementsBukti, setStudentAchievementsBukti] =
    useState(null);

  const [loading, setLoading] = useState(true);
  const [academicReports, setAcademicReports] = useState();
  const [semester, setSemester] = useState();
  const [academicActivities, setAcademicActivities] = useState();
  const [studentAchievements, setStudentAchievements] = useState();
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
  const [refreshData, setRefreshData] = useState(false);
  const [message, setMessage] = useState("");

  const params = useParams<{ laporanId: string }>();

  useEffect(() => {
    const getLaporan = async () => {
      const res = await api.get(`/monev/detail/${params.laporanId}`);
      setFullData(res.data.data);

      setAcademicReports(res.data.data.detailLaporan.academicReports);
      setTargetNextSemester(res.data.data.detailLaporan.targetNextSemester[0]);
      setSemester(res.data.data.detailLaporan.academicReports[0].semester);

      if (res.data.data.detailLaporan.academicActivities[0]) {
        if (
          res.data.data.detailLaporan.academicActivities[0].activityName !==
            "" ||
          res.data.data.detailLaporan.academicActivities[0].activityName !==
            null
        ) {
          setAcademicActivities(res.data.data.detailLaporan.academicActivities);
        }
      }

      if (res.data.data.detailLaporan.studentAchievements[0]) {
        if (
          res.data.data.detailLaporan.studentAchievements[0]
            .achievementsName !== "" ||
          res.data.data.detailLaporan.studentAchievements[0]
            .achievementsName !== null
        ) {
          setStudentAchievements(
            res.data.data.detailLaporan.studentAchievements
          );
        }
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
      }

      setLoading(false);
    };

    getLaporan();
  }, [refreshData]);

  const saveData = async () => {
    setLoading(true);

    const data = {
      academicReports:
        academicReports.length >= 1 ? academicReports[0] : academicReports,
      academicActivities,
      studentAchievements,
      organizationActivities,
      committeeActivities,
      independentActivities,
      studentEvaluations: studentEvaluations
        ? {
            id: studentEvaluations[0].id,
            supportFactors:
              supportFactors === ""
                ? studentEvaluations[0].supportFactors
                : supportFactors,
            barrierFactors:
              supportFactors === ""
                ? studentEvaluations[0].barrierFactors
                : barrierFactors,
          }
        : {
            supportFactors:
              supportFactors === ""
                ? studentEvaluations.supportFactors
                : supportFactors,
            barrierFactors:
              supportFactors === ""
                ? studentEvaluations.barrierFactors
                : barrierFactors,
          },
      targetNextSemester,
      targetAcademicActivities,
      targetAchievements,
      targetIndependentActivities,
    };

    console.log(academicActivities);

    const stringData = JSON.stringify(data);

    const formData = new FormData();
    formData.append("dataBaru", stringData);

    if (academicReportsBukti !== null) {
      formData.append("academicReports_bukti", academicReportsBukti);
    }
    if (academicActivitiesBukti !== null) {
      academicActivitiesBukti.map((item: any, index: number) => {
        formData.append(`academicActivities_${index}_bukti`, item);
      });
    }
    if (organizationActivitiesBukti !== null) {
      organizationActivitiesBukti.map((item: any, index: number) => {
        formData.append(`organizationActivities_${index}_bukti`, item);
      });
    }
    if (committeeActivitiesBukti !== null) {
      committeeActivitiesBukti.map((item: any, index: number) => {
        formData.append(`committeeActivities_${index}_bukti `, item);
      });
    }
    if (independentActivitiesBukti !== null) {
      independentActivitiesBukti.map((item: any, index: number) => {
        formData.append(`independentActivities_${index}_bukti`, item);
      });
    }
    if (studentAchievementsBukti !== null) {
      studentAchievementsBukti.map((item: any, index: number) => {
        formData.append(`studentAchievements_${index}_bukti`, item);
      });
    }

    if (idAcademicActivities.length === 1) {
      await api.delete(
        `/monev/${params.laporanId}/academic-activities/${idAcademicActivities}`
      );
    }
    if (idOrganizationActivities.length === 1) {
      await api.delete(
        `/monev/${params.laporanId}/organization-activities/${idOrganizationActivities}`
      );
    }
    if (idStudentAchievements.length === 1) {
      await api.delete(
        `/monev/${params.laporanId}/student-achievements/${idStudentAchievements}`
      );
    }
    if (idCommitteeActivities.length === 1) {
      await api.delete(
        `/monev/${params.laporanId}/committee-activities/${idCommitteeActivities}`
      );
    }
    if (idIndependentActivities.length === 1) {
      await api.delete(
        `/monev/${params.laporanId}/independent-activities/${idIndependentActivities}`
      );
    }
    if (idTargetAcademicActivities.length === 1) {
      await api.delete(
        `/monev/${params.laporanId}/target-academic-activities/${idTargetAcademicActivities}`
      );
    }
    if (idTargetAchievements.length === 1) {
      await api.delete(
        `/monev/${params.laporanId}/target-achievements/${idTargetAchievements}`
      );
    }
    if (idTargetIndependentActivities.length === 1) {
      await api.delete(
        `/monev/${params.laporanId}/target-independent-activities/${idTargetIndependentActivities}`
      );
    }

    if (
      idAcademicActivities.length > 0 &&
      idAcademicActivities[0] !== undefined
    ) {
      idAcademicActivities.map(async (id) => {
        await api.delete(
          `/monev/${params.laporanId}/academic-activities/${id}`
        );
      });
    }
    if (
      idOrganizationActivities.length > 0 &&
      idOrganizationActivities[0] !== undefined
    ) {
      idOrganizationActivities.map(async (id) => {
        await api.delete(
          `/monev/${params.laporanId}/organization-activities/${id}`
        );
      });
    }
    if (
      idStudentAchievements.length > 0 &&
      idStudentAchievements[0] !== undefined
    ) {
      idStudentAchievements.map(async (id) => {
        await api.delete(
          `/monev/${params.laporanId}/student-achievements/${id}`
        );
      });
    }
    if (
      idCommitteeActivities.length > 0 &&
      idCommitteeActivities[0] !== undefined
    ) {
      idCommitteeActivities.map(async (id) => {
        await api.delete(
          `/monev/${params.laporanId}/committee-activities/${id}`
        );
      });
    }
    if (
      idIndependentActivities.length > 0 &&
      idIndependentActivities[0] !== undefined
    ) {
      idIndependentActivities.map(async (id) => {
        await api.delete(
          `/monev/${params.laporanId}/independent-activities/${id}`
        );
      });
    }
    if (
      idTargetAcademicActivities.length > 0 &&
      idTargetAcademicActivities[0] !== undefined
    ) {
      idTargetAcademicActivities.map(async (id) => {
        await api.delete(
          `/monev/${params.laporanId}/target-academic-activities/${id}`
        );
      });
    }
    if (
      idTargetAchievements.length > 0 &&
      idTargetAchievements[0] !== undefined
    ) {
      idTargetAchievements.map(async (id) => {
        await api.delete(
          `/monev/${params.laporanId}/target-achievements/${id}`
        );
      });
    }
    if (
      idTargetIndependentActivities.length > 0 &&
      idTargetIndependentActivities[0] !== undefined
    ) {
      idTargetIndependentActivities.map(async (id) => {
        await api.delete(
          `/monev/${params.laporanId}/target-independent-activities/${id}`
        );
      });
    }

    setAcademicReportsBukti(null);
    setAcademicActivitiesBukti(null);
    setOrganizationActivitiesBukti(null);
    setCommitteeActivitiesBukti(null);
    setIndependentActivitiesBukti(null);
    setStudentAchievementsBukti(null);

    setIdAcademicActivities([]);
    setAcademicActivities([]);
    setOrganizationActivities([]);
    setIdStudentAchievements([]);
    setStudentAchievements([]);
    setCommitteeActivities([]);
    setIndependentActivities([]);
    setIdTargetAcademicActivities([]);
    setIdTargetAchievements([]);
    setIdTargetIndependentActivities([]);

    try {
      await api.patch(`/monev/draft/${params.laporanId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setRefreshData(!refreshData);
      setMessage("success");
    } catch (error) {
      console.error("Error adding report:", error);
      setMessage("Error: " + error);
    } finally {
      window.scrollTo(0, 0);
      setLoading(false);
    }
  };

  if (loading) {
    return <TabelSkeleton />;
  }

  if (!loading) {
    console.log(fullData);

    return (
      <div className="flex flex-col gap-2 md:gap-4 py-2 md:py-4 px-2 md:px-6 xl:px-36">
        {message === "success" ? (
          <div className="flex flex-col gap-4">
            <Alert
              color="success"
              description="Berhasil memperbarui laporan"
              title="Berhasil"
              variant="faded"
              isClosable={true}
            />
          </div>
        ) : message === "" ? (
          <></>
        ) : (
          <div className="flex flex-col gap-4">
            <Alert
              color="danger"
              description={`Gagal memperbarui laporan, Error ${message}`}
              title="Gagal"
              variant="faded"
              isClosable={true}
            />
          </div>
        )}
        <div className="flex flex-col gap-2 bg-white rounded-xl p-3 lg:p-12">
          <div className="text-xl md:text-2xl font-bold">
            A. LAPORAN KEGIATAN AKADEMIK
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-lg">IPS & IPK</div>
            <TabelAcademicReports
              setAcademicReports={setAcademicReports}
              academicReports={academicReports}
              academicReportsBukti={academicReportsBukti}
              setAcademicReportsBukti={setAcademicReportsBukti}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-lg">Kegiatan Akademik</div>
            <TambahAcademicActivities
              academicActivitiesBukti={academicActivitiesBukti}
              setAcademicActivitiesBukti={setAcademicActivitiesBukti}
              setAcademicActivities={setAcademicActivities}
              academicActivities={academicActivities}
            />
            <TabelAcademicActivities
              academicActivitiesBukti={academicActivitiesBukti}
              setAcademicActivitiesBukti={setAcademicActivitiesBukti}
              idAcademicActivities={idAcademicActivities}
              setIdAcademicActivities={setIdAcademicActivities}
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
              setStudentsAchievements={setStudentAchievements}
              studentsAchievements={studentAchievements}
            />
            <TabelStudentsAchievements
              idStudentAchievements={idStudentAchievements}
              setIdStudentAchievements={setIdStudentAchievements}
              setStudentsAchievements={setStudentAchievements}
              studentsAchievements={studentAchievements}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-lg">Kegiatan organisasi mahasiswa</div>
            <TambahOrganizationActivities
              organizationActivities={organizationActivities}
              setOrganizationActivities={setOrganizationActivities}
            />
            <TabelOrganizationActivities
              idOrganizationActivities={idOrganizationActivities}
              setIdOrganizationActivities={setIdOrganizationActivities}
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
              idCommitteeActivities={idCommitteeActivities}
              setIdCommitteeActivities={setIdCommitteeActivities}
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
              idIndependentActivities={idIndependentActivities}
              setIdIndependentActivities={setIdIndependentActivities}
              independentActivities={independentActivities}
              setIndependentActivities={setIndependentActivities}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 bg-white rounded-xl p-3 lg:p-12">
          <div className="text-xl md:text-2xl font-bold">C. EVALUASI</div>
          <div className="flex flex-col gap-2">
            <div className="text-lg">Faktor Pendukung</div>
            <SupportFactorsTextArea
              studentEvaluations={studentEvaluations}
              supportFactors={supportFactors}
              setSupportFactors={setSupportFactors}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-lg">Faktor Penghambat</div>
            <BarrierFactorsTextArea
              studentEvaluations={studentEvaluations}
              setBarrierFactors={setBarrierFactors}
              barrierFactors={barrierFactors}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 bg-white rounded-xl p-3 lg:p-12">
          <div className="text-xl md:text-2xl font-bold">
            D. Target Semester Depan
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-lg">IPS & IPK</div>
            {targetNextSemester === undefined ||
            targetNextSemester === null ||
            targetNextSemester.length === 0 ? (
              <TambahTargetNextSemester
                semester={semester}
                targetNextSemester={targetNextSemester}
                setTargetNextSemester={setTargetNextSemester}
              />
            ) : (
              <></>
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
              idTargetAcademicActivities={idTargetAcademicActivities}
              setIdTargetAcademicActivities={setIdTargetAcademicActivities}
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
              idTargetAchievements={idTargetAchievements}
              setIdTargetAchievements={setIdTargetAchievements}
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
              idTargetIndependentActivities={idTargetIndependentActivities}
              setIdTargetIndependentActivities={
                setIdTargetIndependentActivities
              }
              targetIndependentActivities={targetIndependentActivities}
              setTargetIndependentActivities={setTargetIndependentActivities}
            />
          </div>
        </div>

        <div className="flex flex-row gap-4 w-full">
          <Pengajuan laporanId={fullData.laporanId} setMessage={setMessage} />
          <Button
            size="lg"
            className="w-full"
            color="primary"
            onPress={() => saveData()}
          >
            Simpan
          </Button>
        </div>
      </div>
    );
  }
}
