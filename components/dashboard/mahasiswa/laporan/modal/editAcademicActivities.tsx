import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";
import { Tooltip } from "@heroui/tooltip";
import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import EditIcon from "@/components/icon/iconEdit";

export default function edit({
  academicActivitiesBukti,
  setAcademicActivitiesBukti,
  index,
  academicActivity,
  setAcademicActivity,
}: {
  academicActivitiesBukti: any;
  setAcademicActivitiesBukti: any;
  index: number;
  academicActivity: any;
  setAcademicActivity: any;
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

    const newArray = academicActivity.map((v: any, i: any) => {
      if (i === index) {
        const data = {
          id: academicActivity[index].id,
          activityName:
            activityName.length === 0
              ? academicActivity[index].activityName
              : activityName,
          activityType:
            activityType.length === 0
              ? academicActivity[index].activityType
              : activityType,
          startDate:
            startDate.length === 0
              ? academicActivity[index].startDate
              : startDate,
          endDate:
            endDate.length === 0 ? academicActivity[index].endDate : endDate,
          place: place.length === 0 ? academicActivity[index].place : place,
          participation:
            participation.length === 0
              ? academicActivity[index].participation
              : participation,
        };

        return data;
      }

      return v;
    });
    setAcademicActivity(newArray);

    if (bukti && academicActivitiesBukti !== null) {
      setAcademicActivitiesBukti((prev: any) => [...prev, bukti]);
      console.log(academicActivitiesBukti);
    }

    if (bukti && academicActivitiesBukti === null) {
      setAcademicActivitiesBukti([bukti]);
      console.log(academicActivitiesBukti);
    }

    onOpenChange();
  };

  return (
    <>
      <Tooltip content="Edit">
        <span
          onClick={onOpen}
          className="my-auto text-lg text-default-400 cursor-pointer hover:text-default-600 active:opacity-50"
        >
          <EditIcon />
        </span>
      </Tooltip>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit Kegiatan Akademik
              </ModalHeader>
              <Form
                onSubmit={(e) => tambahAcademicActivity(e)}
                className="w-full flex flex-col gap-4"
              >
                <ModalBody className="w-full">
                  <Input
                    onChange={(e) => setActivityName(e.target.value)}
                    errorMessage="Masukkan nama kegiatan dengan benar"
                    label="Nama Kegiatan"
                    labelPlacement="outside"
                    placeholder="Masukkan nama kegiatan"
                    type="text"
                    defaultValue={academicActivity[index].activityName}
                    required
                  />
                  <Select
                    className="w-full"
                    errorMessage="Pilih jenis kegiatan dengan benar"
                    label="Jenis Kegiatan"
                    labelPlacement="outside"
                    placeholder="Pilih jenis kegiatan"
                    onChange={(e) => setActivityType(e.target.value)}
                    defaultSelectedKeys={[
                      `${academicActivity[index].activityType}`,
                    ]}
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
                      defaultValue={academicActivity[index].startDate}
                      required
                    />
                    <Input
                      onChange={(e) => setEndDate(e.target.value)}
                      errorMessage="Masukkan tanggal berakhir dengan benar"
                      label="Tanggal Berakhir"
                      labelPlacement="outside"
                      type="date"
                      defaultValue={academicActivity[index].endDate}
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
                    defaultValue={academicActivity[index].place}
                    required
                  />
                  <Select
                    className="w-full"
                    errorMessage="Pilih keikutsertaan dengan benar"
                    label="Keikutsertaan"
                    labelPlacement="outside"
                    placeholder="Pilih keikutsertaan"
                    onChange={(e) => setParticipation(e.target.value)}
                    defaultSelectedKeys={[
                      `${academicActivity[index].participation}`,
                    ]}
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
