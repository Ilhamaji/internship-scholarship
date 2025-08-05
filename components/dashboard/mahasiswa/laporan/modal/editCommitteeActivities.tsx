import React, { useEffect, useState } from "react";
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
  committeeActivities,
  setCommitteeActivities,
}: {
  index: number;
  committeeActivities: any;
  setCommitteeActivities: any;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [activityName, setActivityName] = useState(
    committeeActivities[index].activityName
  );
  const [level, setLevel] = useState(committeeActivities[index].level);
  const [participation, setParticipation] = useState(
    committeeActivities[index].participation
  );
  const [place, setPlace] = useState(committeeActivities[index].place);
  const [startDate, setStartDate] = useState(
    committeeActivities[index].startDate
  );
  const [endDate, setEndDate] = useState(committeeActivities[index].endDate);
  const [buktiUrl, setBuktiUrl] = useState(committeeActivities[index].buktiUrl);

  const tambahAcademicActivity = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const newArray = committeeActivities.map((v: any, i: any) => {
      if (i === index) {
        const data = {
          activityName:
            activityName.length === 0
              ? committeeActivities[index].activityName
              : activityName,
          activityType: committeeActivities[index].activityType,
          level: level.length === 0 ? committeeActivities[index].level : level,
          participation:
            participation.length === 0
              ? committeeActivities[index].participation
              : participation,
          place: place.length === 0 ? committeeActivities[index].place : place,
          startDate:
            startDate.length === 0
              ? committeeActivities[index].startDate
              : startDate,
          endDate:
            endDate.length === 0 ? committeeActivities[index].endDate : endDate,
          buktiUrl:
            buktiUrl.length === 0
              ? committeeActivities[index].buktiUrl
              : buktiUrl,
        };

        return data;
      }

      return v;
    });
    setCommitteeActivities(newArray);

    onOpenChange();
  };

  if (
    committeeActivities[index].activityType.toLowerCase() ===
    "pelatihan kepemimpinan"
  ) {
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
                  Edit Kepanitiaan & Penugasan
                </ModalHeader>
                <Form
                  onSubmit={(e) => tambahAcademicActivity(e)}
                  className="w-full flex flex-col gap-4"
                >
                  <ModalBody className="w-full">
                    <Input
                      onChange={(e) => setActivityName(e.target.value)}
                      errorMessage="Masukkan nama kegiatan dengan benar"
                      label="Nama kegiatan"
                      labelPlacement="outside"
                      placeholder="Masukkan nama kegiatan"
                      type="text"
                      defaultValue={committeeActivities[index].activityName}
                      required
                    />
                    <Select
                      className="w-full"
                      errorMessage="Pilih tingkatan dengan benar"
                      label="Tingkatan"
                      labelPlacement="inside"
                      placeholder="Pilih tingkatan"
                      onChange={(e) => setLevel(e.target.value)}
                      defaultSelectedKeys={[
                        `${committeeActivities[index].level}`,
                      ]}
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
                      defaultSelectedKeys={[
                        `${committeeActivities[index].participation}`,
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
                      onChange={(e) => setPlace(e.target.value)}
                      errorMessage="Masukkan tempat kegiatan dengan benar"
                      label="Tempat"
                      labelPlacement="outside"
                      placeholder="Masukkan tempat kegiatan"
                      type="text"
                      defaultValue={committeeActivities[index].place}
                      required
                    />
                    <div className="flex flex-row gap-2">
                      <Input
                        onChange={(e) => setStartDate(e.target.value)}
                        errorMessage="Masukkan tanggal mulai dengan benar"
                        label="Tanggal Mulai"
                        labelPlacement="outside"
                        type="date"
                        defaultValue={committeeActivities[index].startDate}
                        required
                      />
                      <Input
                        onChange={(e) => setEndDate(e.target.value)}
                        errorMessage="Masukkan tanggal berakhir dengan benar"
                        label="Tanggal Berakhir"
                        labelPlacement="outside"
                        type="date"
                        defaultValue={committeeActivities[index].endDate}
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
                      defaultValue={committeeActivities[index].buktiUrl}
                      required={
                        committeeActivities[index].buktiUrl ? false : true
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
  } else {
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
                  Edit Kepanitiaan & Penugasan
                </ModalHeader>
                <Form
                  onSubmit={(e) => tambahAcademicActivity(e)}
                  className="w-full flex flex-col gap-4"
                >
                  <ModalBody className="w-full">
                    <Input
                      onChange={(e) => setActivityName(e.target.value)}
                      errorMessage="Masukkan nama kegiatan dengan benar"
                      label="Nama kegiatan"
                      labelPlacement="outside"
                      placeholder="Masukkan nama kegiatan"
                      type="text"
                      defaultValue={committeeActivities[index].activityName}
                      required
                    />
                    <Select
                      className="w-full"
                      errorMessage="Pilih tingkatan dengan benar"
                      label="Tingkatan"
                      labelPlacement="inside"
                      placeholder="Pilih tingkatan"
                      onChange={(e) => setLevel(e.target.value)}
                      defaultSelectedKeys={[
                        `${committeeActivities[index].level}`,
                      ]}
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
                      defaultSelectedKeys={[
                        `${committeeActivities[index].participation}`,
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
                      onChange={(e) => setPlace(e.target.value)}
                      errorMessage="Masukkan tempat kegiatan dengan benar"
                      label="Tempat"
                      labelPlacement="outside"
                      placeholder="Masukkan tempat kegiatan"
                      type="text"
                      defaultValue={committeeActivities[index].place}
                      required
                    />
                    <div className="flex flex-row gap-2">
                      <Input
                        onChange={(e) => setStartDate(e.target.value)}
                        errorMessage="Masukkan tanggal mulai dengan benar"
                        label="Tanggal Mulai"
                        labelPlacement="outside"
                        type="date"
                        defaultValue={committeeActivities[index].startDate}
                        required
                      />
                      <Input
                        onChange={(e) => setEndDate(e.target.value)}
                        errorMessage="Masukkan tanggal berakhir dengan benar"
                        label="Tanggal Berakhir"
                        labelPlacement="outside"
                        type="date"
                        defaultValue={committeeActivities[index].endDate}
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
                      defaultValue={committeeActivities[index].buktiUrl}
                      required={
                        committeeActivities[index].buktiUrl ? false : true
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
}
