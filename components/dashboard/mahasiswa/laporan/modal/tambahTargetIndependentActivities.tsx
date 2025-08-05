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
  targetIndependentActivities,
  setTargetIndependentActivities,
}: {
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

    if (targetIndependentActivities === undefined) {
      setTargetIndependentActivities([
        {
          activityName: activityName,
          participation: participation,
        },
      ]);
    } else {
      setTargetIndependentActivities([
        ...targetIndependentActivities,
        {
          activityName: activityName,
          participation: participation,
        },
      ]);
    }

    setActivityName("");
    setParticipation("");
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
                Tambah Target Kegiatan Mandiri
              </ModalHeader>
              <Form
                onSubmit={(e) => tambahAcademicActivity(e)}
                className="w-full flex flex-col gap-4"
              >
                <ModalBody className="w-full">
                  <Input
                    autoFocus
                    onChange={(e) => setActivityName(e.target.value)}
                    errorMessage="Masukkan nama aktivitas dengan benar"
                    label="Nama Aktivitas"
                    labelPlacement="outside"
                    placeholder="Masukkan nama aktivitas"
                    type="text"
                    required
                  />
                  <Input
                    onChange={(e) => setParticipation(e.target.value)}
                    errorMessage="Masukkan keikutsertaan dengan benar"
                    label="Keikutsertaan"
                    labelPlacement="outside"
                    placeholder="Anggota"
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
