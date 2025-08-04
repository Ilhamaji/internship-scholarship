"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/axiosInstance";

import TabelAcademicReports from "@/components/admin/laporan/tabel/tabelAcademicReports";
import TabelAcademicActivities from "@/components/admin/laporan/tabel/tabelAcademicActivities";
import TabelStudentsAchievements from "@/components/admin/laporan/tabel/tabelStudentsAchievements";
import TabelOrganizationActivities from "@/components/admin/laporan/tabel/tabelOrganizationActivities";
import TabelCommitteeActivities from "@/components/admin/laporan/tabel/tabelCommitteeActivities";
import TabelIndependentActivities from "@/components/admin/laporan/tabel/tabelIndependentActivities";
import TabelTargetNextSemester from "@/components/admin/laporan/tabel/tabelTargetNextSemester";
import TabelTargetAcademicActivities from "@/components/admin/laporan/tabel/tabelTargetAcademicActivities";
import TabelTargetAchievements from "@/components/admin/laporan/tabel/tabelTargetAchievements";
import TabelTargetIndependentActivities from "@/components/admin/laporan/tabel/tabelTargetIndependentActivities";

import TabelSkeleton from "@/components/admin/laporan/skeleton/tabelSkeleton";

import { Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import { Alert } from "@heroui/alert";
import { Select, SelectItem } from "@heroui/select";

type Nullable<T> = T | null | undefined;

interface AcademicReport {
  semester: {
    semester: string;
    tahunAjar: string;
  };
  // ... tambahkan field lain jika ada
}

interface Activity {
  activityName?: string | null;
  // other fields...
}

interface Achievement {
  achievementsName?: string | null;
  award?: string | null;
  level?: string | null;
  // ...
}

interface OrganizationActivity {
  ukmName?: string | null;
  // ...
}

interface CommitteeActivity {
  activityName?: string | null;
  // ...
}

interface IndependentActivity {
  activityName?: string | null;
  participation?: string | null;
  // ...
}

interface StudentEvaluation {
  supportFactors?: string | null;
  barrierFactors?: string | null;
}

interface TargetAcademicActivity {
  activityName?: string | null;
  strategy?: string | null;
}

interface TargetAchievement {
  achievementsName?: string | null;
  award?: string | null;
  level?: string | null;
}

interface TargetIndependentActivity {
  activityName?: string | null;
  participation?: string | null;
}

interface TargetNextSemester {
  // define according to API shape
  ips?: string;
  ipk?: string;
}

interface DetailLaporan {
  academicActivities?: Activity[];
  academicReports?: AcademicReport[];
  studentAchievements?: Achievement[];
  studentsAchievements?: Achievement[]; // note: original had inconsistent naming
  organizationActivities?: OrganizationActivity[];
  committeeActivities?: CommitteeActivity[];
  independentActivities?: IndependentActivity[];
  studentEvaluations?: StudentEvaluation[];
  targetNextSemester?: TargetNextSemester[];
  targetAcademicActivities?: TargetAcademicActivity[];
  targetAchievements?: TargetAchievement[];
  targetIndependentActivities?: TargetIndependentActivity[];
}

interface SemesterDetail {
  semester: string;
  tahunAjar: string;
}

interface FullData {
  userId: string;
  laporanId?: string;
  semesterId?: string;
  semesterDetail: SemesterDetail;
  detailLaporan: DetailLaporan;
  createdAt: string;
  updatedAt: string;
}

const isNonEmptyString = (v: any): v is string =>
  typeof v === "string" && v.trim() !== "";

const hasValidAcademicActivities = (arr?: Activity[]) =>
  Array.isArray(arr) &&
  arr.length > 0 &&
  isNonEmptyString(arr[0]?.activityName);

const hasValidAchievements = (arr?: Achievement[]) =>
  Array.isArray(arr) &&
  arr.length > 0 &&
  isNonEmptyString(arr[0]?.achievementsName);

const hasValidOrganizationActivities = (arr?: OrganizationActivity[]) =>
  Array.isArray(arr) && arr.length > 0 && isNonEmptyString(arr[0]?.ukmName);

const hasValidCommitteeActivities = (arr?: CommitteeActivity[]) =>
  Array.isArray(arr) &&
  arr.length > 0 &&
  isNonEmptyString(arr[0]?.activityName);

const hasValidIndependentActivities = (arr?: IndependentActivity[]) =>
  Array.isArray(arr) &&
  arr.length > 0 &&
  isNonEmptyString(arr[0]?.activityName);

const hasValidStudentEvaluations = (arr?: StudentEvaluation[]) =>
  Array.isArray(arr) &&
  arr.length > 0 &&
  isNonEmptyString(arr[0]?.supportFactors) &&
  isNonEmptyString(arr[0]?.barrierFactors);

const hasValidTargetAcademicActivities = (arr?: TargetAcademicActivity[]) =>
  Array.isArray(arr) &&
  arr.length > 0 &&
  isNonEmptyString(arr[0]?.activityName) &&
  isNonEmptyString(arr[0]?.strategy);

const hasValidTargetAchievements = (arr?: TargetAchievement[]) =>
  Array.isArray(arr) &&
  arr.length > 0 &&
  isNonEmptyString(arr[0]?.achievementsName) &&
  isNonEmptyString(arr[0]?.award) &&
  isNonEmptyString(arr[0]?.level);

const hasValidTargetIndependentActivities = (
  arr?: TargetIndependentActivity[]
) =>
  Array.isArray(arr) &&
  arr.length > 0 &&
  isNonEmptyString(arr[0]?.activityName) &&
  isNonEmptyString(arr[0]?.participation);

export default function Page() {
  const params = useParams<{ laporanId: string }>();

  const [fullData, setFullData] = useState<FullData | null>(null);
  const [academicReports, setAcademicReports] = useState<AcademicReport | null>(
    null
  );
  const [semester, setSemester] = useState<string | undefined>(undefined);
  const [academicActivities, setAcademicActivities] = useState<
    Activity[] | null
  >(null);
  const [studentAchievements, setStudentAchievements] = useState<
    Achievement[] | null
  >(null);
  const [organizationActivities, setOrganizationActivities] = useState<
    OrganizationActivity[] | null
  >(null);
  const [committeeActivities, setCommitteeActivities] = useState<
    CommitteeActivity[] | null
  >(null);
  const [independentActivities, setIndependentActivities] = useState<
    IndependentActivity[] | null
  >(null);
  const [studentEvaluations, setStudentEvaluations] =
    useState<StudentEvaluation | null>(null);
  const [targetNextSemester, setTargetNextSemester] =
    useState<TargetNextSemester | null>(null);
  const [targetAcademicActivities, setTargetAcademicActivities] = useState<
    TargetAcademicActivity[] | null
  >(null);
  const [targetAchievements, setTargetAchievements] = useState<
    TargetAchievement[] | null
  >(null);
  const [targetIndependentActivities, setTargetIndependentActivities] =
    useState<TargetIndependentActivity[] | null>(null);

  const [komentarAcademicActivities, setKomentarAcademicActivities] = useState<
    any[]
  >([]);
  const [komentarAcademicReports, setKomentarAcademicReports] =
    useState<string>("");
  const [komentarCommitteeActivities, setKomentarCommitteeActivities] =
    useState<any[]>([]);
  const [komentarIndependentActivities, setKomentarIndependentActivities] =
    useState<any[]>([]);
  const [komentarOrganizationActivities, setKomentarOrganizationActivities] =
    useState<any[]>([]);
  const [komentarStudentsAchievements, setKomentarStudentsAchievements] =
    useState<any[]>([]);

  const [supportFactors, setSupportFactors] = useState("");
  const [barrierFactors, setBarrierFactors] = useState("");

  const [loading, setLoading] = useState(true);
  const [refreshData, setRefreshData] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    if (!params.laporanId) return;
    const getLaporan = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/monev/detail/${params.laporanId}`);
        const data: FullData = res.data.data;
        setFullData(data);

        // Academic Reports
        const report = data.detailLaporan.academicReports?.[0] ?? null;
        if (report) {
          setAcademicReports(report);
          setSemester(report.semester?.semester);
        }

        // Academic Activities
        if (hasValidAcademicActivities(data.detailLaporan.academicActivities)) {
          setAcademicActivities(data.detailLaporan.academicActivities!);
        }

        // Student Achievements (note potential naming mismatch in original)
        const sa =
          data.detailLaporan.studentAchievements ??
          data.detailLaporan.studentsAchievements;
        if (hasValidAchievements(sa)) {
          setStudentAchievements(sa!);
        }

        if (
          hasValidOrganizationActivities(
            data.detailLaporan.organizationActivities
          )
        ) {
          setOrganizationActivities(data.detailLaporan.organizationActivities!);
        }

        if (
          hasValidCommitteeActivities(data.detailLaporan.committeeActivities)
        ) {
          setCommitteeActivities(data.detailLaporan.committeeActivities!);
        }

        if (
          hasValidIndependentActivities(
            data.detailLaporan.independentActivities
          )
        ) {
          setIndependentActivities(data.detailLaporan.independentActivities!);
        }

        if (hasValidStudentEvaluations(data.detailLaporan.studentEvaluations)) {
          setStudentEvaluations(
            data.detailLaporan.studentEvaluations![0] as StudentEvaluation
          );
        }

        if (
          Array.isArray(data.detailLaporan.targetNextSemester) &&
          data.detailLaporan.targetNextSemester.length > 0
        ) {
          setTargetNextSemester(data.detailLaporan.targetNextSemester[0]);
        }

        if (
          hasValidTargetAcademicActivities(
            data.detailLaporan.targetAcademicActivities
          )
        ) {
          setTargetAcademicActivities(
            data.detailLaporan.targetAcademicActivities!
          );
        }

        if (hasValidTargetAchievements(data.detailLaporan.targetAchievements)) {
          setTargetAchievements(data.detailLaporan.targetAchievements!);
        }

        if (
          hasValidTargetIndependentActivities(
            data.detailLaporan.targetIndependentActivities
          )
        ) {
          setTargetIndependentActivities(
            data.detailLaporan.targetIndependentActivities!
          );
        }
      } catch (err) {
        console.error("Failed to fetch laporan:", err);
        setMessage("Gagal memuat data"); // bisa diperluas dengan error message
      } finally {
        setLoading(false);
      }
    };

    getLaporan();
  }, [params.laporanId, refreshData]);

  const saveData = async () => {
    if (!params.laporanId) return;
    setLoading(true);
    try {
      await api.patch(`/admin/monev/${params.laporanId}/acc-reject`, {
        status,
        comments: {
          academicReports: komentarAcademicReports || "",
          academicActivities: [...komentarAcademicActivities],
          studentAchievements: [...komentarStudentsAchievements],
          organizationActivities: [...komentarOrganizationActivities],
          committeeActivities: [...komentarCommitteeActivities],
          independentActivities: [...komentarIndependentActivities],
        },
      });
      setRefreshData((v) => !v);
      setMessage("success");
    } catch (error: any) {
      console.error("Error adding report:", error);
      setMessage(`Error: ${error?.message ?? "unknown"}`);
    } finally {
      window.scrollTo(0, 0);
      setLoading(false);
    }
  };

  const formattedCreated = useMemo(() => {
    if (!fullData) return "";
    const d = new Date(fullData.createdAt);
    const pad = (n: number) => String(n).padStart(2, "0");
    const chh = pad(d.getUTCHours());
    const cmm = pad(d.getUTCMinutes());
    const css = pad(d.getUTCSeconds());
    const cdd = pad(d.getUTCDate());
    const cMM = pad(d.getUTCMonth() + 1);
    const cyy = String(d.getUTCFullYear()).slice(2);
    return `${chh}:${cmm}:${css} ${cdd}/${cMM}/${cyy}`;
  }, [fullData]);

  const formattedUpdated = useMemo(() => {
    if (!fullData) return "";
    const d = new Date(fullData.updatedAt);
    const pad = (n: number) => String(n).padStart(2, "0");
    const uhh = pad(d.getUTCHours());
    const umm = pad(d.getUTCMinutes());
    const uss = pad(d.getUTCSeconds());
    const udd = pad(d.getUTCDate());
    const uMM = pad(d.getUTCMonth() + 1);
    const uyy = String(d.getUTCFullYear()).slice(2);
    return `${uhh}:${umm}:${uss} ${udd}/${uMM}/${uyy}`;
  }, [fullData]);

  if (loading) return <TabelSkeleton />;

  if (!fullData)
    return (
      <div className="p-6">
        <Alert
          title="Error"
          description="Data laporan tidak tersedia"
          color="danger"
          variant="faded"
          isClosable
        />
      </div>
    );

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
          description={`Gagal memperbarui laporan, ${message}`}
          title="Gagal"
          variant="faded"
          isClosable
        />
      ) : null}

      <div className="flex flex-col gap-2 bg-white rounded-xl p-3 lg:p-12">
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-2">
          <div>
            <b>NIM</b> : {fullData.userId}
          </div>
          <div>
            {fullData.semesterDetail.tahunAjar} -{" "}
            {fullData.semesterDetail.semester}
          </div>
          <div>Dibuat : {formattedCreated}</div>
          <div>Update : {formattedUpdated}</div>
        </div>
      </div>

      {/* A. Laporan Kegiatan Akademik */}
      <div className="flex flex-col gap-2 bg-white rounded-xl p-3 lg:p-12">
        <div className="text-xl md:text-2xl font-bold">
          A. LAPORAN KEGIATAN AKADEMIK
        </div>

        <div className="flex flex-col gap-2">
          <div className="text-lg">IPS & IPK</div>
          <TabelAcademicReports
            komentarAcademicReports={komentarAcademicReports}
            setKomentarAcademicReports={setKomentarAcademicReports}
            setAcademicReports={setAcademicReports}
            academicReports={academicReports}
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="text-lg">Kegiatan Akademik</div>
          <TabelAcademicActivities
            komentarAcademicActivities={komentarAcademicActivities}
            setKomentarAcademicActivities={setKomentarAcademicActivities}
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
          <TabelStudentsAchievements
            komentarStudentsAchievements={komentarStudentsAchievements}
            setKomentarStudentsAchievements={setKomentarStudentsAchievements}
            setStudentsAchievements={setStudentAchievements}
            studentsAchievements={studentAchievements}
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="text-lg">Kegiatan organisasi mahasiswa</div>
          <TabelOrganizationActivities
            komentarOrganizationActivities={komentarOrganizationActivities}
            setKomentarOrganizationActivities={
              setKomentarOrganizationActivities
            }
            organizationActivities={organizationActivities}
            setOrganizationActivities={setOrganizationActivities}
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="text-lg">
            Kegiatan kepanitiaan & penugasan selama satu semester
          </div>
          <TabelCommitteeActivities
            komentarCommitteeActivities={komentarCommitteeActivities}
            setKomentarCommitteeActivities={setKomentarCommitteeActivities}
            committeeActivities={committeeActivities}
            setCommitteeActivities={setCommitteeActivities}
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="text-lg">Kegiatan mandiri selama satu semester</div>
          <TabelIndependentActivities
            komentarIndependentActivities={komentarIndependentActivities}
            setKomentarIndependentActivities={setKomentarIndependentActivities}
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
          <Textarea
            disabled
            size="lg"
            placeholder="Jelaskan faktor pendukung anda"
            onChange={(e) => setSupportFactors(e.target.value)}
            defaultValue={studentEvaluations?.supportFactors ?? ""}
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="text-lg">Faktor Penghambat</div>
          <Textarea
            disabled
            size="lg"
            placeholder="Jelaskan faktor penghambat anda"
            onChange={(e) => setBarrierFactors(e.target.value)}
            defaultValue={studentEvaluations?.barrierFactors ?? ""}
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
          <TabelTargetNextSemester
            targetNextSemester={targetNextSemester}
            setTargetNextSemester={setTargetNextSemester}
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="text-lg">Kegiatan Akademik</div>
          <TabelTargetAcademicActivities
            targetAcademicActivities={targetAcademicActivities}
            setTargetAcademicActivities={setTargetAcademicActivities}
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="text-lg">
            Prestasi yang diraih selama semester ini
          </div>
          <TabelTargetAchievements
            targetAchievements={targetAchievements}
            setTargetAchievements={setTargetAchievements}
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="text-lg">Kegiatan mandiri selama satu semester</div>
          <TabelTargetIndependentActivities
            targetIndependentActivities={targetIndependentActivities}
            setTargetIndependentActivities={setTargetIndependentActivities}
          />
        </div>
      </div>

      {/* Footer actions */}
      <div className="w-full flex flex-row gap-2">
        <Select
          color="primary"
          label="Status"
          size="sm"
          placeholder="Pilih Status Laporan"
          onChange={(e) => setStatus(e.target.value)}
          value={status}
        >
          <SelectItem key="Lolos">Lolos</SelectItem>
          <SelectItem key="Lolos dengan penugasan">
            Lolos Dengan Penugasan
          </SelectItem>
          <SelectItem key="Ditolak SP-1">Ditolak SP-1</SelectItem>
          <SelectItem key="Ditolak SP-2">Ditolak SP-2</SelectItem>
          <SelectItem key="Ditolak SP-3">Ditolak SP-3</SelectItem>
          <SelectItem key="Pending">Pending</SelectItem>
          <SelectItem key="Draft">Draft</SelectItem>
        </Select>
        <Button
          className="w-full my-auto"
          radius="sm"
          size="lg"
          color="primary"
          onPress={saveData}
        >
          Simpan
        </Button>
      </div>
    </div>
  );
}
