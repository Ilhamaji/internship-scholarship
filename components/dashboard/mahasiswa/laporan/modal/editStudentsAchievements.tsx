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
  studentsAchievements,
  setStudentsAchievements,
  index,
}: {
  studentsAchievements: any;
  setStudentsAchievements: any;
  index: number;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [achievementsName, setAchievementsName] = useState("");
  const [award, setAward] = useState("");
  const [level, setLevel] = useState("");
  const [scope, setScope] = useState("");
  const [isGroup, setIsGroup] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [place, setPlace] = useState("");
  const [buktiUrl, setBuktiUrl] = useState("");

  const tambahAcademicActivity = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const newArray = studentsAchievements.map((v: any, i: any) => {
      if (i === index) {
        const data = {
          achievementsName:
            achievementsName.length === 0
              ? studentsAchievements[index].achievementsName
              : achievementsName,
          award: award.length === 0 ? studentsAchievements[index].award : award,
          level: level.length === 0 ? studentsAchievements[index].level : level,
          scope: scope.length === 0 ? studentsAchievements[index].scope : scope,
          isGroup:
            isGroup.length === 0
              ? studentsAchievements[index].isGroup
              : isGroup === "true"
                ? true
                : false,
          startDate:
            startDate.length === 0
              ? studentsAchievements[index].startDate
              : startDate,
          endDate:
            endDate.length === 0
              ? studentsAchievements[index].endDate
              : endDate,
          place: place.length === 0 ? studentsAchievements[index].place : place,
          buktiUrl:
            buktiUrl.length === 0
              ? studentsAchievements[index].buktiUrl
              : buktiUrl,
        };

        return data;
      }

      return v;
    });
    setStudentsAchievements(newArray);

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
      <Modal placement="auto" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit Prestasi Yang Diraih
              </ModalHeader>
              <Form
                onSubmit={(e) => tambahAcademicActivity(e)}
                className="w-full flex flex-col gap-4"
              >
                <ModalBody className="w-full">
                  <Input
                    onChange={(e) => setAchievementsName(e.target.value)}
                    errorMessage="Masukkan nama prestasi dengan benar"
                    label="Nama Prestasi"
                    labelPlacement="outside"
                    placeholder="Masukkan nama prestasi"
                    type="text"
                    defaultValue={studentsAchievements[index].achievementsName}
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
                      `${studentsAchievements[index].level}`,
                    ]}
                    required
                  >
                    <SelectItem key={"Internasional"}>Internasional</SelectItem>
                    <SelectItem key={"Nasional"}>Nasional</SelectItem>
                    <SelectItem key={"Regional"}>Regional</SelectItem>
                    <SelectItem key={"Perguruan Tinggi"}>
                      Perguruan Tinggi
                    </SelectItem>
                  </Select>
                  <Select
                    className="w-full"
                    errorMessage="Pilih raihan dengan benar"
                    label="Raihan"
                    labelPlacement="inside"
                    placeholder="Pilih raihan"
                    onChange={(e) => setAward(e.target.value)}
                    defaultSelectedKeys={[
                      `${studentsAchievements[index].award}`,
                    ]}
                    required
                  >
                    <SelectItem key={"Juara 1"}>Juara 1</SelectItem>
                    <SelectItem key={"Juara 2"}>Juara 2</SelectItem>
                    <SelectItem key={"Juara 3"}>Juara 3</SelectItem>
                    <SelectItem key={"Harapan"}>Harapan</SelectItem>
                    <SelectItem key={"Peserta Terpilih"}>
                      Peserta Terpilih
                    </SelectItem>
                  </Select>
                  <Select
                    className="w-full"
                    errorMessage="Pilih scope dengan benar"
                    label="Scope"
                    labelPlacement="inside"
                    placeholder="Pilih scope"
                    onChange={(e) => setScope(e.target.value)}
                    defaultSelectedKeys={[
                      `${studentsAchievements[index].scope}`,
                    ]}
                    required
                  >
                    <SelectItem key={"Pemerintahan"}>Pemerintahan</SelectItem>
                    <SelectItem key={"Non-Pemerintahan"}>
                      Non-Pemerintahan
                    </SelectItem>
                  </Select>
                  <Select
                    className="w-full"
                    errorMessage="Pilih tim/individu dengan benar"
                    label="Tim/Individu"
                    labelPlacement="inside"
                    placeholder="Pilih tim/individu"
                    onChange={(e) => setIsGroup(e.target.value)}
                    defaultSelectedKeys={[
                      `${studentsAchievements[index].isGroup}`,
                    ]}
                    required
                  >
                    <SelectItem key={"true"}>Tim</SelectItem>
                    <SelectItem key={"false"}>Individu</SelectItem>
                  </Select>
                  <div className="flex flex-row gap-2">
                    <Input
                      onChange={(e) => setStartDate(e.target.value)}
                      errorMessage="Masukkan tanggal mulai dengan benar"
                      label="Tanggal Mulai"
                      labelPlacement="outside"
                      type="date"
                      defaultValue={studentsAchievements[index].startDate}
                      required
                    />
                    <Input
                      onChange={(e) => setEndDate(e.target.value)}
                      errorMessage="Masukkan tanggal berakhir dengan benar"
                      label="Tanggal Berakhir"
                      labelPlacement="outside"
                      type="date"
                      defaultValue={studentsAchievements[index].endDate}
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
                    defaultValue={studentsAchievements[index].place}
                    required
                  />
                  <Input
                    onChange={(e) => setBuktiUrl(e.target.value)}
                    errorMessage="Masukkan bukti kegiatan dengan benar"
                    label="Bukti"
                    labelPlacement="outside"
                    placeholder="Masukkan bukti kegiatan"
                    type="file"
                    defaultValue={studentsAchievements[index].buktiUrl}
                    required={
                      studentsAchievements[index].buktiUrl ? false : true
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
