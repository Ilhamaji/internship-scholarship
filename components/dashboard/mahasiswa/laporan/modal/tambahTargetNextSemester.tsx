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
  semester,
  targetNextSemester,
  setTargetNextSemester,
}: {
  semester: any;
  targetNextSemester: any;
  setTargetNextSemester: any;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [ipkTarget, setIpkTarget] = useState("");
  const [ipsTarget, setIpsTarget] = useState("");
  const nextSemester = semester + 1;

  const tambahAcademicActivity = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setTargetNextSemester({
      semester: nextSemester,
      ipkTarget: ipkTarget,
      ipsTarget: ipsTarget,
    });

    setIpsTarget("");
    setIpkTarget("");
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
                Tambah Target IPK dan IPS
              </ModalHeader>
              <Form
                onSubmit={(e) => tambahAcademicActivity(e)}
                className="w-full flex flex-col gap-4"
              >
                <ModalBody className="w-full">
                  <Input
                    autoFocus
                    onChange={(e) => setIpsTarget(e.target.value)}
                    errorMessage="Masukkan IPS dengan benar"
                    label="IPS"
                    labelPlacement="outside"
                    placeholder="Masukkan IPS"
                    type="number"
                    max={4}
                    required
                  />
                  <Input
                    onChange={(e) => setIpkTarget(e.target.value)}
                    errorMessage="Masukkan IPK dengan benar"
                    label="IPK"
                    labelPlacement="outside"
                    placeholder="Masukkan IPK"
                    type="number"
                    max={4}
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
