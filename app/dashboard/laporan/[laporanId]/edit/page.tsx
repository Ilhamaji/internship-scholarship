"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/axiosInstance";

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

import { Alert } from "@heroui/alert";
import { Button } from "@heroui/button";
import TabelSkeleton from "@/components/dashboard/mahasiswa/laporan/skeleton/tabelSkeleton";

type AcademicReport = {
  semester?: string;
  // ... tambahkan field lain sesuai API
};

type Activity = {
  id?: string;
  activityName?: string;
  ukmName?: string;
  // ... lainnya
};

type Achievement = {
  id?: string;
  achievementsName?: string;
  award?: string;
  level?: string;
};

type IndependentActivity = {
  id?: string;
  activityName?: string;
};

type StudentEvaluation = {
  id?: string;
  supportFactors?: string | null;
  barrierFactors?: string | null;
};

type TargetAcademicActivity = {
  id?: string;
  activityName?: string | null;
  strategy?: string | null;
};

type TargetAchievement = {
  id?: string;
  achievementsName?: string | null;
  award?: string | null;
  level?: string | null;
};

type TargetIndependentActivity = {
  id?: string;
  activityName?: string | null;
  participation?: string | null;
};

type TargetNextSemester = {
  // struktur IPS/IPK, misal:
  ipk?: number;
  ips?: number;
  // ...
};

type DetailLaporan = {
  academicReports: AcademicReport[];
  academicActivities: Activity[];
  studentAchievements: Achievement[];
  organizationActivities: Activity[];
  committeeActivities: Activity[];
  independentActivities: IndependentActivity[];
  studentEvaluations: StudentEvaluation[];
  targetNextSemester: TargetNextSemester[];
  targetAcademicActivities: TargetAcademicActivity[];
  targetAchievements: TargetAchievement[];
  targetIndependentActivities: TargetIndependentActivity[];
};

type FullData = {
  laporanId: string;
  detailLaporan: DetailLaporan;
};

const isTruthyString = (val: string | null | undefined) =>
  typeof val === "string" && val.trim() !== "";

const Page: React.FC = () => {
  const params = useParams() as { laporanId?: string };
  const laporanId = params.laporanId ?? "";

  // IDs to delete
  const [idAcademicActivities, setIdAcademicActivities] = useState<string[]>(
    []
  );
  const [idOrganizationActivities, setIdOrganizationActivities] = useState<
    string[]
  >([]);
  const [idStudentAchievements, setIdStudentAchievements] = useState<string[]>(
    []
  );
  const [idCommitteeActivities, setIdCommitteeActivities] = useState<string[]>(
    []
  );
  const [idIndependentActivities, setIdIndependentActivities] = useState<
    string[]
  >([]);
  const [idTargetAcademicActivities, setIdTargetAcademicActivities] = useState<
    string[]
  >([]);
  const [idTargetAchievements, setIdTargetAchievements] = useState<string[]>(
    []
  );
  const [idTargetIndependentActivities, setIdTargetIndependentActivities] =
    useState<string[]>([]);

  // bukti file uploads
  const [academicReportsBukti, setAcademicReportsBukti] = useState<File | null>(
    null
  );
  const [academicActivitiesBukti, setAcademicActivitiesBukti] = useState<
    File[] | null
  >(null);
  const [organizationActivitiesBukti, setOrganizationActivitiesBukti] =
    useState<File[] | null>(null);
  const [committeeActivitiesBukti, setCommitteeActivitiesBukti] = useState<
    File[] | null
  >(null);
  const [independentActivitiesBukti, setIndependentActivitiesBukti] = useState<
    File[] | null
  >(null);
  const [studentAchievementsBukti, setStudentAchievementsBukti] = useState<
    File[] | null
  >(null);

  // data utama
  const [loading, setLoading] = useState<boolean>(true);
  const [academicReports, setAcademicReports] = useState<AcademicReport[]>([]);
  const [semester, setSemester] = useState<string | undefined>(undefined);
  const [academicActivities, setAcademicActivities] = useState<Activity[]>([]);
  const [studentAchievements, setStudentAchievements] = useState<Achievement[]>(
    []
  );
  const [organizationActivities, setOrganizationActivities] = useState<
    Activity[]
  >([]);
  const [committeeActivities, setCommitteeActivities] = useState<Activity[]>(
    []
  );
  const [independentActivities, setIndependentActivities] = useState<
    IndependentActivity[]
  >([]);
  const [supportFactors, setSupportFactors] = useState<string>("");
  const [barrierFactors, setBarrierFactors] = useState<string>("");
  const [studentEvaluations, setStudentEvaluations] =
    useState<StudentEvaluation | null>(null);
  const [targetNextSemester, setTargetNextSemester] =
    useState<TargetNextSemester | null>(null);
  const [targetAcademicActivities, setTargetAcademicActivities] = useState<
    TargetAcademicActivity[]
  >([]);
  const [targetAchievements, setTargetAchievements] = useState<
    TargetAchievement[]
  >([]);
  const [targetIndependentActivities, setTargetIndependentActivities] =
    useState<TargetIndependentActivity[]>([]);
  const [fullData, setFullData] = useState<FullData | null>(null);
  const [refreshData, setRefreshData] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const fetchLaporan = useCallback(async () => {
    if (!laporanId) return;

    setLoading(true);
    try {
      const res = await api.get(`/monev/detail/${laporanId}`);
      const data: FullData = res.data.data;
      setFullData(data);

      const detail = data.detailLaporan;

      setAcademicReports(detail.academicReports || []);
      setTargetNextSemester(
        detail.targetNextSemester?.[0] ? detail.targetNextSemester[0] : null
      );
      setSemester(detail.academicReports?.[0]?.semester);

      if (
        detail.academicActivities?.length &&
        detail.academicActivities[0].activityName &&
        detail.academicActivities[0].activityName.trim() !== ""
      ) {
        setAcademicActivities(detail.academicActivities);
      }

      if (
        detail.studentAchievements?.length &&
        detail.studentAchievements[0].achievementsName &&
        detail.studentAchievements[0].achievementsName.trim() !== ""
      ) {
        setStudentAchievements(detail.studentAchievements);
      }

      if (
        detail.organizationActivities?.length &&
        detail.organizationActivities[0].ukmName &&
        detail.organizationActivities[0].ukmName.trim() !== ""
      ) {
        setOrganizationActivities(detail.organizationActivities);
      }

      if (
        detail.committeeActivities?.length &&
        detail.committeeActivities[0].activityName &&
        detail.committeeActivities[0].activityName.trim() !== ""
      ) {
        setCommitteeActivities(detail.committeeActivities);
      }

      if (
        detail.independentActivities?.length &&
        detail.independentActivities[0].activityName &&
        detail.independentActivities[0].activityName.trim() !== ""
      ) {
        setIndependentActivities(detail.independentActivities);
      }

      if (detail.studentEvaluations?.length) {
        const eval0 = detail.studentEvaluations[0];
        if (
          isTruthyString(eval0.supportFactors || "") ||
          isTruthyString(eval0.barrierFactors || "")
        ) {
          setStudentEvaluations(eval0);
          setSupportFactors(eval0.supportFactors || "");
          setBarrierFactors(eval0.barrierFactors || "");
        }
      }

      if (
        detail.targetAcademicActivities?.length &&
        (isTruthyString(
          detail.targetAcademicActivities[0].activityName || ""
        ) ||
          isTruthyString(detail.targetAcademicActivities[0].strategy || ""))
      ) {
        setTargetAcademicActivities(detail.targetAcademicActivities);
      }

      if (
        detail.targetAchievements?.length &&
        (isTruthyString(detail.targetAchievements[0].achievementsName || "") ||
          isTruthyString(detail.targetAchievements[0].award || "") ||
          isTruthyString(detail.targetAchievements[0].level || ""))
      ) {
        setTargetAchievements(detail.targetAchievements);
      }

      if (
        detail.targetIndependentActivities?.length &&
        (isTruthyString(
          detail.targetIndependentActivities[0].activityName || ""
        ) ||
          isTruthyString(
            detail.targetIndependentActivities[0].participation || ""
          ))
      ) {
        setTargetIndependentActivities(detail.targetIndependentActivities);
      }
    } catch (err) {
      console.error("Error fetching laporan:", err);
    } finally {
      setLoading(false);
    }
  }, [laporanId]);

  useEffect(() => {
    void fetchLaporan();
  }, [fetchLaporan, refreshData]);

  const saveData = async () => {
    if (!laporanId) return;
    setLoading(true);
    try {
      const studentEvalPayload = studentEvaluations
        ? {
            id: studentEvaluations.id,
            supportFactors:
              supportFactors.trim() === ""
                ? studentEvaluations.supportFactors
                : supportFactors,
            barrierFactors:
              barrierFactors.trim() === ""
                ? studentEvaluations.barrierFactors
                : barrierFactors,
          }
        : {
            supportFactors,
            barrierFactors,
          };

      const payload = {
        academicReports:
          academicReports.length >= 1 ? academicReports[0] : academicReports,
        academicActivities,
        studentAchievements,
        organizationActivities,
        committeeActivities,
        independentActivities,
        studentEvaluations: studentEvalPayload,
        targetNextSemester,
        targetAcademicActivities,
        targetAchievements,
        targetIndependentActivities,
      };

      const formData = new FormData();
      formData.append("dataBaru", JSON.stringify(payload));

      if (academicReportsBukti !== null && academicReportsBukti !== undefined) {
        formData.append("academicReports_bukti", academicReportsBukti);
      }

      const appendFiles = (
        files: File[] | null,
        prefix: string,
        includeIndexNameSpace = false
      ) => {
        if (!files) return;
        files.forEach((file, idx) => {
          formData.append(
            `${prefix}_${idx}_bukti`,
            file,
            includeIndexNameSpace ? `${prefix}_${idx}_bukti` : undefined
          );
        });
      };

      appendFiles(academicActivitiesBukti, "academicActivities");
      appendFiles(organizationActivitiesBukti, "organizationActivities");
      appendFiles(committeeActivitiesBukti, "committeeActivities");
      appendFiles(independentActivitiesBukti, "independentActivities");
      appendFiles(studentAchievementsBukti, "studentAchievements");

      // batch deletes (avoid double delete): collect all ids in arrays
      const deleteIfSingle = async (ids: string[], path: string) => {
        if (ids.length === 1 && ids[0]) {
          await api.delete(`/monev/${laporanId}/${path}/${ids[0]}`);
        } else if (ids.length > 1) {
          await Promise.all(
            ids
              .filter((id) => id)
              .map((id) => api.delete(`/monev/${laporanId}/${path}/${id}`))
          );
        }
      };

      await Promise.all([
        deleteIfSingle(idAcademicActivities, "academic-activities"),
        deleteIfSingle(idOrganizationActivities, "organization-activities"),
        deleteIfSingle(idStudentAchievements, "student-achievements"),
        deleteIfSingle(idCommitteeActivities, "committee-activities"),
        deleteIfSingle(idIndependentActivities, "independent-activities"),
        deleteIfSingle(
          idTargetAcademicActivities,
          "target-academic-activities"
        ),
        deleteIfSingle(idTargetAchievements, "target-achievements"),
        deleteIfSingle(
          idTargetIndependentActivities,
          "target-independent-activities"
        ),
      ]);

      // reset temporary upload / selection state
      setAcademicReportsBukti(null);
      setAcademicActivitiesBukti(null);
      setOrganizationActivitiesBukti(null);
      setCommitteeActivitiesBukti(null);
      setIndependentActivitiesBukti(null);
      setStudentAchievementsBukti(null);

      setIdAcademicActivities([]);
      setIdOrganizationActivities([]);
      setIdStudentAchievements([]);
      setIdCommitteeActivities([]);
      setIdIndependentActivities([]);
      setIdTargetAcademicActivities([]);
      setIdTargetAchievements([]);
      setIdTargetIndependentActivities([]);

      await api.patch(`/monev/draft/${laporanId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setRefreshData((f) => !f);
      setMessage("success");
    } catch (error: any) {
      console.error("Error saving report:", error);
      setMessage(error?.message ? error.message : "unknown error");
    } finally {
      window.scrollTo(0, 0);
      setLoading(false);
    }
  };

  if (loading) {
    return <TabelSkeleton />;
  }

  console.log(fullData);
  return (
    <div className="flex flex-col gap-2 md:gap-4 py-2 md:py-4 px-2 md:px-6 xl:px-36">
      {message === "success" ? (
        <Alert
          color="success"
          description="Berhasil memperbarui laporan"
          title="Berhasil"
          variant="faded"
          isClosable
        />
      ) : message && message !== "" ? (
        <Alert
          color="danger"
          description={`Gagal memperbarui laporan, Error ${message}`}
          title="Gagal"
          variant="faded"
          isClosable
        />
      ) : null}

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

      {/* B. Non Akademik */}
      <div className="flex flex-col gap-2 bg-white rounded-xl p-3 lg:p-12">
        <div className="text-xl md:text-2xl font-bold">
          B. LAPORAN KEGIATAN NON AKADEMIK
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-lg">
            Prestasi yang diraih selama semester ini
          </div>
          <TambahStudentsAchievements
            studentAchievementsBukti={studentAchievementsBukti}
            setStudentAchievementsBukti={setStudentAchievementsBukti}
            setStudentsAchievements={setStudentAchievements}
            studentsAchievements={studentAchievements}
          />
          <TabelStudentsAchievements
            studentAchievementsBukti={studentAchievementsBukti}
            setStudentAchievementsBukti={setStudentAchievementsBukti}
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

      {/* C. Evaluasi */}
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

      {/* D. Target Semester Depan */}
      <div className="flex flex-col gap-2 bg-white rounded-xl p-3 lg:p-12">
        <div className="text-xl md:text-2xl font-bold">
          D. Target Semester Depan
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-lg">IPS & IPK</div>
          {!targetNextSemester ? (
            <TambahTargetNextSemester
              semester={semester}
              targetNextSemester={targetNextSemester}
              setTargetNextSemester={setTargetNextSemester}
            />
          ) : null}
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
            setIdTargetIndependentActivities={setIdTargetIndependentActivities}
            targetIndependentActivities={targetIndependentActivities}
            setTargetIndependentActivities={setTargetIndependentActivities}
          />
        </div>
      </div>

      <div className="flex flex-row gap-4 w-full">
        <Pengajuan
          laporanId={fullData?.laporanId ?? ""}
          setMessage={setMessage}
        />
        <Button size="lg" className="w-full" color="primary" onPress={saveData}>
          Simpan
        </Button>
      </div>
    </div>
  );
};

export default Page;
