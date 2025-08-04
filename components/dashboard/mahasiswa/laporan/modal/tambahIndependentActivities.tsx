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
  independentActivities,
  setIndependentActivities,
}: {
  independentActivities: any;
  setIndependentActivities: any;
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

    if (independentActivities !== undefined) {
      setIndependentActivities([
        ...independentActivities,
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
      setIndependentActivities([
        {
          activityName: activityName,
          activityType: activityType,
          startDate: startDate,
          level:
            activityType === "Juri" ||
            activityType === "Wasit" ||
            activityType === "Pelatih" ||
            activityType === "Kegiatan Forum Ilmiah" ||
            activityType === "Karya Yang Didanai" ||
            activityType === "Karya Populer Yang Diterbitkan" ||
            activityType === "Bidang Sosial, Kerohanian, dan Lainnya" ||
            activityType === "Pengakuan Dari Institusi Luar PT" ||
            activityType === "Publikasi Jurnal"
              ? level
              : "",
          endDate: endDate,
          place: place,
          buktiUrl: buktiUrl,
          participation:
            activityType === "Kegiatan Forum Ilmiah" ||
            activityType === "Bidang Sosial, Kerohanian, dan Lainnya" ||
            activityType === "Karya Yang Didanai" ||
            activityType === "Karya Populer Yang Diterbitkan" ||
            activityType === "Publikasi Jurnal"
              ? participation
              : "",
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
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Tambah Kegiatan Mandiri
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
                      setParticipation("");
                      setActivityType(e.target.value);
                    }}
                    required
                  >
                    <SelectItem key={"Magang"}>Magang</SelectItem>
                    <SelectItem key={"Studi Independen"}>
                      Studi Independen
                    </SelectItem>
                    <SelectItem key={"Kampus Mengajar"}>
                      Kampus Mengajar
                    </SelectItem>
                    <SelectItem key={"IISMA"}>IISMA</SelectItem>
                    <SelectItem key={"Pertukaran Mahasiswa Merdeka"}>
                      Pertukaran Mahasiswa Merdeka
                    </SelectItem>
                    <SelectItem key={"KKN Tematik"}>KKN Tematik</SelectItem>
                    <SelectItem key={"Proyek Kemanusiaan"}>
                      Proyek Kemanusiaan
                    </SelectItem>
                    <SelectItem key={"Riset/Penelitian"}>
                      Riset/Penelitian
                    </SelectItem>
                    <SelectItem key={"Juri"}>Juri</SelectItem>
                    <SelectItem key={"Wasit"}>Wasit</SelectItem>
                    <SelectItem key={"Pelatih"}>Pelatih</SelectItem>
                    <SelectItem key={"Anggota Tim Dalam Penelitian/Pengabdian"}>
                      Anggota Tim Dalam Penelitian/Pengabdian
                    </SelectItem>
                    <SelectItem key={"Kuliah Umum/Tamu"}>
                      Kuliah Umum/Tamu
                    </SelectItem>
                    <SelectItem key={"Penulis Buku Ber-ISBN"}>
                      Penulis Buku Ber-ISBN
                    </SelectItem>
                    <SelectItem key={"Hak Paten/Paten Sementara"}>
                      Hak Paten/Paten Sementara
                    </SelectItem>
                    <SelectItem key={"Kegiatan Forum Ilmiah"}>
                      Kegiatan Forum Ilmiah
                    </SelectItem>
                    <SelectItem key={"Karya Yang Didanai"}>
                      Karya Yang Didanai
                    </SelectItem>
                    <SelectItem key={"Karya Populer Yang Diterbitkan"}>
                      Karya Populer Yang Diterbitkan
                    </SelectItem>
                    <SelectItem key={"Publikasi Jurnal"}>
                      Publikasi Jurnal
                    </SelectItem>
                    <SelectItem key={"Bidang Sosial, Kerohanian, dan Lainnya"}>
                      Bidang Sosial, Kerohanian, dan Lainnya
                    </SelectItem>
                    <SelectItem key={"Pengakuan Dari Institusi Luar PT"}>
                      Pengakuan Dari Institusi Luar PT
                    </SelectItem>
                  </Select>
                  {activityType === "Juri" ||
                  activityType === "Wasit" ||
                  activityType === "Pelatih" ||
                  activityType === "Kegiatan Forum Ilmiah" ||
                  activityType === "Karya Yang Didanai" ||
                  activityType === "Karya Populer Yang Diterbitkan" ||
                  activityType === "Bidang Sosial, Kerohanian, dan Lainnya" ||
                  activityType === "Pengakuan Dari Institusi Luar PT" ? (
                    <Select
                      className="w-full"
                      errorMessage="Pilih tingkatan dengan benar"
                      label="Tingkatan"
                      labelPlacement="inside"
                      placeholder="Pilih tingkatan"
                      onChange={(e) => {
                        setParticipation("");
                        setLevel(e.target.value);
                      }}
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
                  ) : activityType === "Publikasi Jurnal" ? (
                    <Select
                      className="w-full"
                      errorMessage="Pilih tingkatan dengan benar"
                      label="Tingkatan"
                      labelPlacement="inside"
                      placeholder="Pilih tingkatan"
                      onChange={(e) => {
                        setParticipation("");
                        setLevel(e.target.value);
                      }}
                      required
                    >
                      <SelectItem key={"Internasional"}>
                        Internasional
                      </SelectItem>
                      <SelectItem key={"Nasional Terakreditasi"}>
                        Nasional Terakreditasi
                      </SelectItem>
                      <SelectItem key={"Regional Tidak Terakreditasi"}>
                        Regional Tidak Terakreditasi
                      </SelectItem>
                    </Select>
                  ) : (
                    ""
                  )}
                  <Input
                    onChange={(e) => setActivityName(e.target.value)}
                    errorMessage="Masukkan nama kegiatan dengan benar"
                    label="Nama Kegiatan"
                    labelPlacement="outside"
                    placeholder="Masukkan nama kegiatan"
                    type="text"
                    required
                  />
                  <Input
                    onChange={(e) => setPlace(e.target.value)}
                    errorMessage="Masukkan tempat kegiatan dengan benar"
                    label="Tempat"
                    labelPlacement="outside"
                    placeholder="Masukkan tempat kegiatan"
                    type="text"
                    required
                  />
                  {activityType === "Kegiatan Forum Ilmiah" ||
                  activityType === "Bidang Sosial, Kerohanian, dan Lainnya" ? (
                    <Select
                      className="w-full"
                      errorMessage="Pilih keikutsertaan dengan benar"
                      label="Keikutsertaan"
                      labelPlacement="inside"
                      placeholder="Pilih keikutsertaan"
                      onChange={(e) => setParticipation(e.target.value)}
                      required
                    >
                      <SelectItem key={"Pembicara"}>Pembicara</SelectItem>
                      <SelectItem key={"Moderator"}>Moderator</SelectItem>
                      <SelectItem key={"Peserta"}>Peserta</SelectItem>
                    </Select>
                  ) : activityType === "Karya Yang Didanai" ||
                    activityType === "Karya Populer Yang Diterbitkan" ||
                    activityType === "Publikasi Jurnal" ? (
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
                      <SelectItem key={"Anggota"}>Anggota</SelectItem>
                    </Select>
                  ) : (
                    ""
                  )}
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
