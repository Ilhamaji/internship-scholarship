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
  committeeActivities,
  setCommitteeActivities,
}: {
  committeeActivities: any;
  setCommitteeActivities: any;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [activityName, setActivityName] = useState("");
  const [activityType, setActivityType] = useState("");
  const [level, setLevel] = useState("");
  const [participation, setParticipation] = useState("");
  const [place, setPlace] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [buktiUrl, setBuktiUrl] = useState("");

  const tambahAcademicActivity = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (committeeActivities === undefined) {
      setCommitteeActivities([
        {
          activityName: activityName,
          activityType: activityType,
          startDate: startDate,
          level: level,
          endDate: endDate,
          place: place,
          buktiUrl: buktiUrl,
          participation: participation,
        },
      ]);
    } else {
      setCommitteeActivities([
        ...committeeActivities,
        {
          activityName: activityName,
          activityType: activityType,
          startDate: startDate,
          level: level,
          endDate: endDate,
          place: place,
          buktiUrl: buktiUrl,
          participation: participation,
        },
      ]);
    }

    setActivityName("");
    setActivityType("");
    setStartDate("");
    setEndDate("");
    setPlace("");
    setLevel("");
    setBuktiUrl("");
    setParticipation("");

    onOpenChange();
  };

  return (
    <>
      <Button onPress={onOpen} className="flex max-w-40">
        <LinkIcon /> Tambah Data
      </Button>
      <Modal
        placement="auto"
        scrollBehavior="inside"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Tambah Kepanitiaan & Penugasan
              </ModalHeader>
              <Form
                onSubmit={(e) => tambahAcademicActivity(e)}
                className="w-full flex flex-col gap-4"
              >
                <ModalBody className="w-full">
                  <Select
                    className="w-full"
                    errorMessage="Pilih jenis kegiatan dengan benar"
                    label="Jenis Kegiatan"
                    labelPlacement="inside"
                    placeholder="Pilih jenis kegiatan"
                    onChange={(e) => {
                      setLevel("");
                      setActivityType(e.target.value);
                    }}
                    required
                  >
                    <SelectItem key={"Pelatihan Kepemimpinan"}>
                      Pelatihan Kepemimpinan
                    </SelectItem>
                    <SelectItem key={"Panitia Dalam Kegiatan Perguruan Tinggi"}>
                      Panitia Dalam Kegiatan Perguruan Tinggi
                    </SelectItem>
                  </Select>
                  {activityType === "Pelatihan Kepemimpinan" ? (
                    <>
                      <Input
                        onChange={(e) => setActivityName(e.target.value)}
                        errorMessage="Masukkan nama kegiatan dengan benar"
                        label="Nama kegiatan"
                        labelPlacement="outside"
                        placeholder="Masukkan nama kegiatan"
                        type="text"
                        required
                      />
                      <Select
                        className="w-full"
                        errorMessage="Pilih tingkatan dengan benar"
                        label="Tingkatan"
                        labelPlacement="inside"
                        placeholder="Pilih tingkatan"
                        onChange={(e) => setLevel(e.target.value)}
                        required
                      >
                        <SelectItem key={"Pra-Dasar"}>Pra-Dasar</SelectItem>
                        <SelectItem key={"Dasar"}>Dasar</SelectItem>
                        <SelectItem key={"Menengah"}>Menengah</SelectItem>
                        <SelectItem key={"Lanjut"}>Lanjut</SelectItem>
                      </Select>
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
                        onChange={(e) => setPlace(e.target.value)}
                        errorMessage="Masukkan tempat kegiatan dengan benar"
                        label="Tempat"
                        labelPlacement="outside"
                        placeholder="Masukkan tempat kegiatan"
                        type="text"
                        required
                      />
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
                        onChange={(e) => setBuktiUrl(e.target.value)}
                        errorMessage="Masukkan bukti kegiatan dengan benar"
                        label="Bukti"
                        labelPlacement="outside"
                        placeholder="Masukkan bukti kegiatan"
                        type="file"
                        required
                      />
                    </>
                  ) : (
                    <>
                      <Input
                        onChange={(e) => setActivityName(e.target.value)}
                        errorMessage="Masukkan nama kegiatan dengan benar"
                        label="Nama kegiatan"
                        labelPlacement="outside"
                        placeholder="Masukkan nama kegiatan"
                        type="text"
                        required
                      />
                      <Select
                        className="w-full"
                        errorMessage="Pilih tingkatan dengan benar"
                        label="Tingkatan"
                        labelPlacement="inside"
                        placeholder="Pilih tingkatan"
                        onChange={(e) => setLevel(e.target.value)}
                        required
                      >
                        <SelectItem key={"Perguruan Tinggi"}>
                          Perguruan Tinggi
                        </SelectItem>
                        <SelectItem key={"Regional"}>Regional</SelectItem>
                        <SelectItem key={"Nasional"}>Nasional</SelectItem>
                        <SelectItem key={"Internasional"}>
                          Internasional
                        </SelectItem>
                      </Select>
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
                        onChange={(e) => setPlace(e.target.value)}
                        errorMessage="Masukkan tempat kegiatan dengan benar"
                        label="Tempat"
                        labelPlacement="outside"
                        placeholder="Masukkan tempat kegiatan"
                        type="text"
                        required
                      />
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
                        onChange={(e) => setBuktiUrl(e.target.value)}
                        errorMessage="Masukkan bukti kegiatan dengan benar"
                        label="Bukti"
                        labelPlacement="outside"
                        placeholder="Masukkan bukti kegiatan"
                        type="file"
                        required
                      />
                    </>
                  )}
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
