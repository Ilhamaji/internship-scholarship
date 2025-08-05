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
  index,
  independentActivities,
  setIndependentActivities,
}: {
  index: number;
  independentActivities: any;
  setIndependentActivities: any;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [activityOnChange, setActivityOnChange] = useState(false);
  const [activityName, setActivityName] = useState(
    independentActivities[index].activityName
  );
  const [activityType, setActivityType] = useState(
    independentActivities[index].activityType
  );
  const [level, setLevel] = useState(independentActivities[index].level);
  const [participation, setParticipation] = useState(
    independentActivities[index].participation
  );
  const [place, setPlace] = useState(independentActivities[index].place);
  const [startDate, setStartDate] = useState(
    independentActivities[index].startDate
  );
  const [endDate, setEndDate] = useState(independentActivities[index].endDate);
  const [buktiUrl, setBuktiUrl] = useState(
    independentActivities[index].buktiUrl
  );

  const tambahAcademicActivity = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (
      activityType.toLowerCase() === "juri" ||
      activityType.toLowerCase() === "wasit" ||
      activityType.toLowerCase() === "pelatih" ||
      activityType.toLowerCase() === "kegiatan forum ilmiah" ||
      activityType.toLowerCase() === "karya yang didanai" ||
      activityType.toLowerCase() === "karya populer yang diterbitkan" ||
      activityType.toLowerCase() === "bidang sosial, kerohanian, dan lainnya" ||
      activityType.toLowerCase() === "pengakuan dari institusi luar pt" ||
      activityType.toLowerCase() === "publikasi jurnal"
    ) {
      setActivityType(activityType);
    } else {
      setLevel("");
      setParticipation("");
    }

    if (
      activityType.toLowerCase() === "kegiatan forum ilmiah" ||
      activityType.toLowerCase() === "bidang sosial, kerohanian, dan lainnya" ||
      activityType.toLowerCase() === "karya yang didanai" ||
      activityType.toLowerCase() === "karya populer yang diterbitkan" ||
      activityType.toLowerCase() === "publikasi jurnal"
    ) {
      setParticipation(participation);
    } else {
      setParticipation("");
    }

    const newArray = independentActivities.map((v: any, i: any) => {
      if (i === index) {
        const data = {
          activityName:
            activityName.length === 0
              ? independentActivities[index].activityName
              : activityName,
          activityType:
            activityType.length === 0
              ? independentActivities[index].activityType
              : activityType,
          level: activityOnChange ? level : independentActivities[index].level,
          startDate:
            startDate.length === 0
              ? independentActivities[index].startDate
              : startDate,
          endDate:
            endDate.length === 0
              ? independentActivities[index].endDate
              : endDate,
          place:
            place.length === 0 ? independentActivities[index].place : place,
          buktiUrl:
            buktiUrl.length === 0
              ? independentActivities[index].buktiUrl
              : buktiUrl,
          participation: activityOnChange
            ? participation
            : independentActivities[index].participation,
        };

        return data;
      }

      return v;
    });
    setIndependentActivities(newArray);

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
      <Modal placement="bottom" isOpen={isOpen} onOpenChange={onOpenChange}>
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
                  <Select
                    className="w-full"
                    errorMessage="Pilih jenis kegiatan dengan benar"
                    label="Jenis Kegiatan"
                    labelPlacement="inside"
                    placeholder="Pilih jenis kegiatan"
                    onChange={(e) => {
                      setLevel("");
                      setParticipation("");
                      setActivityOnChange(true);
                      setActivityType(e.target.value);
                    }}
                    defaultSelectedKeys={[
                      `${independentActivities[index].activityType}`,
                    ]}
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
                      defaultSelectedKeys={[`${level}`]}
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
                      defaultSelectedKeys={[`${level}`]}
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
                    defaultValue={independentActivities[index].activityName}
                    required
                  />
                  <Input
                    onChange={(e) => setPlace(e.target.value)}
                    errorMessage="Masukkan tempat kegiatan dengan benar"
                    label="Tempat"
                    labelPlacement="outside"
                    placeholder="Masukkan tempat kegiatan"
                    type="text"
                    defaultValue={independentActivities[index].place}
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
                      defaultSelectedKeys={[`${participation}`]}
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
                      defaultSelectedKeys={[`${participation}`]}
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
                      defaultValue={independentActivities[index].startDate}
                      required
                    />
                    <Input
                      onChange={(e) => setEndDate(e.target.value)}
                      errorMessage="Masukkan tanggal berakhir dengan benar"
                      label="Tanggal Berakhir"
                      labelPlacement="outside"
                      type="date"
                      defaultValue={independentActivities[index].endDate}
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
                    defaultValue={independentActivities[index].buktiUrl}
                    required={
                      independentActivities[index].buktiUrl ? false : true
                    }
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
