import React, { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalContent,
  useDisclosure,
} from "@heroui/modal";
import { Tooltip } from "@heroui/tooltip";
import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
import { Input, Textarea } from "@heroui/input";
import EditIcon from "@/components/icon/iconEdit";

export default function edit({
  index,
  targetAchievements,
  setTargetAchievements,
}: {
  index: number;
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

    const newArray = targetAchievements.map((v: any, i: any) => {
      if (i === index) {
        const data = {
          achievementsName:
            achievementsName.length === 0
              ? targetAchievements[index].achievementsName
              : achievementsName,
          award: award.length === 0 ? targetAchievements[index].award : award,
          level: level.length === 0 ? targetAchievements[index].level : level,
        };

        return data;
      }

      return v;
    });
    setTargetAchievements(newArray);

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
                Tambah Target IPK dan IPS
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
                    defaultValue={targetAchievements[index].achievementsName}
                    required
                  />
                  <Input
                    onChange={(e) => setLevel(e.target.value)}
                    errorMessage="Masukkan tingkatan dengan benar"
                    label="Tingkatan"
                    labelPlacement="outside"
                    placeholder="Internasional"
                    type="text"
                    defaultValue={targetAchievements[index].level}
                    required
                  />
                  <Input
                    onChange={(e) => setAward(e.target.value)}
                    errorMessage="Masukkan raihan dengan benar"
                    label="Raihan"
                    labelPlacement="outside"
                    placeholder="Juara 1"
                    type="text"
                    defaultValue={targetAchievements[index].award}
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
