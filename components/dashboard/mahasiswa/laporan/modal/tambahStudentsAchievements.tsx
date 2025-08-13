"use client";

import React from "react";
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
  studentAchievementsBukti,
  setStudentAchievementsBukti,
  studentsAchievements,
  setStudentsAchievements,
}: {
  studentAchievementsBukti: any;
  setStudentAchievementsBukti: any;
  studentsAchievements: any;
  setStudentsAchievements: any;
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
  const [bukti, setBukti] = useState<File | null>(null);
  const [buktiError, setBuktiError] = useState<String | null>(null);

  const tambahAcademicActivity = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (studentsAchievements === undefined) {
      setStudentsAchievements([
        {
          achievementsName: achievementsName,
          award: award,
          level: level,
          scope: scope,
          isGroup: isGroup === "true" ? true : false,
          startDate: startDate,
          endDate: endDate,
          place: place,
        },
      ]);
    } else {
      setStudentsAchievements([
        ...studentsAchievements,
        {
          achievementsName: achievementsName,
          award: award,
          level: level,
          scope: scope,
          isGroup: isGroup === "true" ? true : false,
          startDate: startDate,
          endDate: endDate,
          place: place,
        },
      ]);
    }

    if (bukti !== null) {
      if (studentAchievementsBukti && Array.isArray(studentAchievementsBukti)) {
        setStudentAchievementsBukti([...studentAchievementsBukti, bukti]);
      } else {
        setStudentAchievementsBukti([bukti]);
      }
    }

    setAchievementsName("");
    setAward("");
    setLevel("");
    setScope("");
    setIsGroup("");
    setStartDate("");
    setEndDate("");
    setPlace("");
    setBukti(null);

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
                Tambah Prestasi Yang Diraih
              </ModalHeader>
              <Form
                onSubmit={(e) => tambahAcademicActivity(e)}
                className="w-full flex flex-col gap-4"
              >
                <ModalBody className="w-full">
                  <Input
                    autoFocus
                    onChange={(e) => setAchievementsName(e.target.value)}
                    errorMessage="Masukkan nama prestasi dengan benar"
                    label="Nama Prestasi"
                    labelPlacement="outside"
                    placeholder="Masukkan nama prestasi"
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
                  <Input
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        const file = e.target.files[0];
                        if (file.size > 4 * 1024 * 1024) {
                          // 4 MB
                          setBuktiError("Ukuran file maksimal 4 MB");
                          setBukti(null);
                        } else {
                          setBuktiError(null);
                          setBukti(file);
                        }
                      }
                    }}
                    errorMessage={
                      buktiError || "Masukkan bukti kegiatan dengan benar"
                    }
                    isInvalid={!!buktiError}
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
