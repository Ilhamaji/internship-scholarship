"use client";

import React from "react";
import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";
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
  targetAchievements,
  setTargetAchievements,
}: {
  targetAchievements: any;
  setTargetAchievements: any;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [achievementsName, setAchievementsName] = useState("");
  const [award, setAward] = useState("");
  const [level, setLevel] = useState("");

  const tambahAcademicActivity = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (targetAchievements === undefined) {
      setTargetAchievements([
        {
          achievementsName: achievementsName,
          award: award,
          level: level,
        },
      ]);
    } else {
      setTargetAchievements([
        ...targetAchievements,
        {
          achievementsName: achievementsName,
          award: award,
          level: level,
        },
      ]);
    }

    setAchievementsName("");
    setAward("");
    setLevel("");
    onOpenChange();
  };

  return (
    <>
      <Button onPress={onOpen} className="flex max-w-40">
        <LinkIcon /> Tambah Data
      </Button>
      <Modal placement="auto" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Tambah Target Prestasi
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
                  <Input
                    onChange={(e) => setLevel(e.target.value)}
                    errorMessage="Masukkan tingkatan dengan benar"
                    label="Tingkatan"
                    labelPlacement="outside"
                    placeholder="Internasional"
                    type="text"
                    required
                  />
                  <Input
                    onChange={(e) => setAward(e.target.value)}
                    errorMessage="Masukkan raihan dengan benar"
                    label="Raihan"
                    labelPlacement="outside"
                    placeholder="Juara 1"
                    type="text"
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
