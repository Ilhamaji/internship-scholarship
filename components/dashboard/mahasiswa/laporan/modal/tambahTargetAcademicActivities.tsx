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
  targetAcademicActivities,
  setTargetAcademicActivities,
}: {
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

    if (targetAcademicActivities === undefined) {
      setTargetAcademicActivities([
        {
          activityName: activityName,
          strategy: strategy,
        },
      ]);
    } else {
      setTargetAcademicActivities([
        ...targetAcademicActivities,
        {
          activityName: activityName,
          strategy: strategy,
        },
      ]);
    }

    setActivityName("");
    setStrategy("");
    onOpenChange();
  };

  return (
    <>
      <Button onPress={onOpen} className="flex max-w-40">
        <LinkIcon /> Tambah Data
      </Button>
      <Modal placement="center" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Tambah Target Kegiatan Akademik
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
                    required
                  />
                  <Textarea
                    onChange={(e) => setStrategy(e.target.value)}
                    errorMessage="Masukkan strategi dengan benar"
                    label="Strategi"
                    labelPlacement="outside"
                    placeholder="Masukkan strategi"
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
