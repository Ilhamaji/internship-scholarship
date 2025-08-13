"use client";

import React, { useEffect, useState } from "react";
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
import { Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import api from "@/lib/axiosInstance";
import { useParams } from "next/navigation";
import { Alert } from "@heroui/alert";
import TabelSkeleton from "@/components/admin/laporan/skeleton/tabelSkeleton";
import { Spinner } from "@heroui/spinner";
import { Select, SelectItem } from "@heroui/select";

export default function Page() {
  const [komentarAcademicActivities, setKomentarAcademicActivities] = useState(
    []
  );
  const [komentarAcademicReports, setKomentarAcademicReports] = useState();
  const [komentarCommitteeActivities, setKomentarCommitteeActivities] =
    useState([]);
  const [komentarIndependentActivities, setKomentarIndependentActivities] =
    useState([]);
  const [komentarOrganizationActivities, setKomentarOrganizationActivities] =
    useState([]);
  const [komentarStudentsAchievements, setKomentarStudentsAchievements] =
    useState([]);

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
  const [status, setStatus] = useState("");

  const params = useParams<{ laporanId: string }>();

  useEffect(() => {
    const getLaporan = async () => {
      const res = await api.get(`/monev/detail/${params.laporanId}`);

      setFullData(res.data.data);

      setAcademicReports(res.data.data.detailLaporan.academicReports[0]);
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
          res.data.data.detailLaporan.studentsAchievements[0]
            .achievementsName !== "" ||
          res.data.data.detailLaporan.studentsAchievements[0]
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
          setStudentEvaluations(
            res.data.data.detailLaporan.studentEvaluations[0]
          );
        }
      }

      setLoading(false);
    };

    getLaporan();
  }, [refreshData]);

  const saveData = async () => {
    setLoading(true);
    try {
      const response = await api.patch(
        `/admin/monev/${params.laporanId}/acc-reject`,
        {
          status: status,
          comments: {
            academicReports:
              komentarAcademicReports === undefined ||
              komentarAcademicReports === null ||
              komentarAcademicReports.length === 0
                ? ""
                : komentarAcademicReports,
            academicActivities: [...komentarAcademicActivities],
            studentAchievements: [...komentarStudentsAchievements],
            organizationActivities: [...komentarOrganizationActivities],
            committeeActivities: [...komentarCommitteeActivities],
            independentActivities: [...komentarIndependentActivities],
          },
        }
      );

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
    const created = new Date(fullData.createdAt);
    const updated = new Date(fullData.updatedAt);

    const chh = String(created.getUTCHours()).padStart(2, "0");
    const cmm = String(created.getUTCMinutes()).padStart(2, "0");
    const css = String(created.getUTCSeconds()).padStart(2, "0");
    const cdd = String(created.getUTCDate()).padStart(2, "0");
    const cMM = String(created.getUTCMonth() + 1).padStart(2, "0");
    const cyy = String(created.getUTCFullYear()).slice(2);

    const uhh = String(updated.getUTCHours()).padStart(2, "0");
    const umm = String(updated.getUTCMinutes()).padStart(2, "0");
    const uss = String(updated.getUTCSeconds()).padStart(2, "0");
    const udd = String(updated.getUTCDate()).padStart(2, "0");
    const uMM = String(updated.getUTCMonth() + 1).padStart(2, "0");
    const uyy = String(updated.getUTCFullYear()).slice(2);

    const formattedCreated = `${chh}:${cmm}:${css} ${cdd}/${cMM}/${cyy}`;
    const formattedUpdated = `${uhh}:${umm}:${uss} ${udd}/${uMM}/${uyy}`;

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

        <div className="flex flex-row bg-white rounded-xl p-3 lg:p-12 justify-between">
          <div className="flex flex-col gap-2">
            <div className="">
              Nama mahasiswa : {fullData?.userDetails.name}
            </div>
            <div className="">Angkatan : {fullData?.userDetails.angkatan}</div>
            <div className="">Prodi : {fullData?.userDetails.prodi}</div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="">
              Laporan semester : {academicReports?.semester}
            </div>
            <div className="">
              Tahun Ajaran : {fullData?.semesterDetail.tahunAjar}
            </div>
            <div className="">{fullData?.semesterDetail.semester}</div>
          </div>
        </div>

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
              setKomentarIndependentActivities={
                setKomentarIndependentActivities
              }
              independentActivities={independentActivities}
              setIndependentActivities={setIndependentActivities}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 bg-white rounded-xl p-3 lg:p-12">
          <div className="text-xl md:text-2xl font-bold">C. EVALUASI</div>
          {studentEvaluations === undefined ||
          studentEvaluations === null ||
          studentEvaluations.length === 0 ? (
            <>
              <div className="flex flex-col gap-2">
                <div className="text-lg">Faktor Pendukung</div>
                <Textarea
                  disabled
                  size={"lg"}
                  placeholder="Jelaskan faktor pendukung anda"
                  onChange={(e) => setSupportFactors(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="text-lg">Faktor Penghambat</div>
                <Textarea
                  disabled
                  size={"lg"}
                  placeholder="Jelaskan faktor penghambat anda"
                  onChange={(e) => setBarrierFactors(e.target.value)}
                />
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col gap-2">
                <div className="text-lg">Faktor Pendukung</div>
                <Textarea
                  disabled
                  size={"lg"}
                  placeholder="Jelaskan faktor pendukung anda"
                  onChange={(e) => setSupportFactors(e.target.value)}
                  defaultValue={studentEvaluations.supportFactors}
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="text-lg">Faktor Penghambat</div>
                <Textarea
                  disabled
                  size={"lg"}
                  placeholder="Jelaskan faktor penghambat anda"
                  onChange={(e) => setBarrierFactors(e.target.value)}
                  defaultValue={studentEvaluations.barrierFactors}
                />
              </div>
            </>
          )}
        </div>
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

        <div className="w-full flex flex-row gap-2">
          <Select
            color="primary"
            label="Status"
            size="sm"
            placeholder="Pilih Status Laporan"
            onChange={(e) => setStatus(e.target.value)}
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
            onPress={() => saveData()}
          >
            Simpan
          </Button>
        </div>
      </div>
    );
  }
}
