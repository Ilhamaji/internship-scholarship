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
  targetIndependentActivities,
  setTargetIndependentActivities,
}: {
  index: number;
  targetIndependentActivities: any;
  setTargetIndependentActivities: any;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [activityName, setActivityName] = useState("");
  const [participation, setParticipation] = useState("");

  const tambahAcademicActivity = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const newArray = targetIndependentActivities.map((v: any, i: any) => {
      if (i === index) {
        const data = {
          activityName:
            activityName.length === 0
              ? targetIndependentActivities[index].activityName
              : activityName,
          participation:
            participation.length === 0
              ? targetIndependentActivities[index].participation
              : participation,
        };

        return data;
      }

      return v;
    });
    setTargetIndependentActivities(newArray);

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
      <Modal placement="center" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit Target Kegiatan Mandiri
              </ModalHeader>
              <Form
                onSubmit={(e) => tambahAcademicActivity(e)}
                className="w-full flex flex-col gap-4"
              >
                <ModalBody className="w-full">
                  <Input
                    onChange={(e) => setActivityName(e.target.value)}
                    errorMessage="Masukkan nama aktivitas dengan benar"
                    label="Nama Aktivitas"
                    labelPlacement="outside"
                    placeholder="Masukkan nama aktivitas"
                    type="text"
                    defaultValue={
                      targetIndependentActivities[index].activityName
                    }
                    required
                  />
                  <Input
                    onChange={(e) => setParticipation(e.target.value)}
                    errorMessage="Masukkan keikutsertaan dengan benar"
                    label="Keikutsertaan"
                    labelPlacement="outside"
                    placeholder="Anggota"
                    type="text"
                    defaultValue={
                      targetIndependentActivities[index].participation
                    }
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
