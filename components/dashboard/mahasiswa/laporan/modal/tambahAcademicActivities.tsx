"use client";

import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { LinkIcon } from "@heroui/link";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";
import { Form } from "@heroui/form";
import { useState } from "react";
import { Select, SelectItem } from "@heroui/select";

export default function App({
  academicActivitiesBukti,
  setAcademicActivitiesBukti,
  academicActivities,
  setAcademicActivities,
}: {
  academicActivitiesBukti: any;
  setAcademicActivitiesBukti: any;
  academicActivities: any;
  setAcademicActivities: any;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [activityName, setActivityName] = useState("");
  const [activityType, setActivityType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [place, setPlace] = useState("");
  const [bukti, setBukti] = useState<File | null>(null);
  const [participation, setParticipation] = useState("");

  const tambahAcademicActivity = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (academicActivities === undefined) {
      setAcademicActivities([
        {
          activityName: activityName,
          activityType: activityType,
          startDate: startDate,
          endDate: endDate,
          place: place,
          participation: participation,
        },
      ]);
    } else {
      setAcademicActivities([
        ...academicActivities,
        {
          activityName: activityName,
          activityType: activityType,
          startDate: startDate,
          endDate: endDate,
          place: place,
          participation: participation,
        },
      ]);
    }

    if (bukti !== null) {
      if (academicActivitiesBukti !== null) {
        setAcademicActivitiesBukti(bukti);
      } else {
        setAcademicActivitiesBukti([bukti]);
      }
    }

    setActivityName("");
    setActivityType("");
    setStartDate("");
    setEndDate("");
    setPlace("");
    setBukti(null);
    setParticipation("");

    onOpenChange();
  };

  return (
    <>
      <Button onPress={onOpen} className="flex max-w-40">
        <LinkIcon /> Tambah Data
      </Button>
      <Modal placement="top" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Tambah Kegiatan Akademik
              </ModalHeader>
              <Form
                onSubmit={(e) => tambahAcademicActivity(e)}
                className="w-full flex flex-col gap-4"
              >
                <ModalBody className="w-full">
                  <Input
                    autoFocus
                    onChange={(e) => setActivityName(e.target.value)}
                    errorMessage="Masukkan nama kegiatan dengan benar"
                    label="Nama Kegiatan"
                    labelPlacement="outside"
                    placeholder="Masukkan nama kegiatan"
                    type="text"
                    required
                  />
                  <Select
                    className="w-full"
                    errorMessage="Pilih jenis kegiatan dengan benar"
                    label="Jenis Kegiatan"
                    labelPlacement="inside"
                    placeholder="Pilih jenis kegiatan"
                    onChange={(e) => setActivityType(e.target.value)}
                    required
                  >
                    <SelectItem key={"Salam Kampus"}>Salam Kampus</SelectItem>
                    <SelectItem key={"Social Training Camp"}>
                      Social Training Camp
                    </SelectItem>
                    <SelectItem key={"Asistensi Keagamaan"}>
                      Asistensi Keagamaan
                    </SelectItem>
                    <SelectItem key={"Program Kreativitas Mahasiswa"}>
                      Program Kreativitas Mahasiswa
                    </SelectItem>
                    <SelectItem key={"Sertifikasi Internasional Program Studi"}>
                      Sertifikasi Internasional Program Studi
                    </SelectItem>
                  </Select>
                  <div className="flex flex-row gap-2">
                    <Input
                      onChange={(e) => setStartDate(e.target.value)}
                      errorMessage="Masukkan tanggal mulai dengan benar"
                      label="Tanggal Mulai"
                      labelPlacement="outside"
                      type="date"
                      required
                    />
                    <Input
                      onChange={(e) => setEndDate(e.target.value)}
                      errorMessage="Masukkan tanggal berakhir dengan benar"
                      label="Tanggal Berakhir"
                      labelPlacement="outside"
                      type="date"
                      required
                    />
                  </div>
                  <Input
                    onChange={(e) => setPlace(e.target.value)}
                    errorMessage="Masukkan tempat kegiatan dengan benar"
                    label="Tempat"
                    labelPlacement="outside"
                    placeholder="Masukkan tempat kegiatan"
                    type="text"
                    required
                  />
                  <Select
                    className="w-full"
                    errorMessage="Pilih keikutsertaan dengan benar"
                    label="Keikutsertaan"
                    labelPlacement="inside"
                    placeholder="Pilih keikutsertaan"
                    onChange={(e) => setParticipation(e.target.value)}
                    required
                  >
                    <SelectItem key={"Ketua"}>Ketua</SelectItem>
                    <SelectItem key={"Wakil Ketua"}>Wakil Ketua</SelectItem>
                    <SelectItem key={"Sekertaris"}>Sekertaris</SelectItem>
                    <SelectItem key={"Bendahara"}>Bendahara</SelectItem>
                    <SelectItem key={"Divisi"}>Divisi</SelectItem>
                    <SelectItem key={"Anggota"}>Anggota</SelectItem>
                  </Select>
                  <Input
                    onChange={(e) =>
                      setBukti(e.target.files ? e.target.files[0] : null)
                    }
                    errorMessage="Masukkan bukti kegiatan dengan benar"
                    label="Bukti"
                    labelPlacement="outside"
                    placeholder="Masukkan bukti kegiatan"
                    type="file"
                  />
                </ModalBody>
                <ModalFooter className="w-full">
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button type="submit" color="primary">
                    Action
                  </Button>
                </ModalFooter>
              </Form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
