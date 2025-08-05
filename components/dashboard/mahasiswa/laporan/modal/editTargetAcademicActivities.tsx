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
  targetAcademicActivities,
  setTargetAcademicActivities,
}: {
  index: number;
  targetAcademicActivities: any;
  setTargetAcademicActivities: any;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [activityName, setActivityName] = useState("");
  const [strategy, setStrategy] = useState("");

  const tambahAcademicActivity = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const newArray = targetAcademicActivities.map((v: any, i: any) => {
      if (i === index) {
        const data = {
          activityName:
            activityName.length === 0
              ? targetAcademicActivities[index].activityName
              : activityName,
          strategy:
            strategy.length === 0
              ? targetAcademicActivities[index].strategy
              : strategy,
        };

        return data;
      }

      return v;
    });
    setTargetAcademicActivities(newArray);

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
                Tambah Target IPK dan IPS
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
                    defaultValue={targetAcademicActivities[index].activityName}
                    required
                  />
                  <Textarea
                    onChange={(e) => setStrategy(e.target.value)}
                    errorMessage="Masukkan strategi dengan benar"
                    label="Strategi"
                    labelPlacement="outside"
                    placeholder="Masukkan strategi"
                    defaultValue={targetAcademicActivities[index].strategy}
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
