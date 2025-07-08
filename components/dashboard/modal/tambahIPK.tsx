"use client";

import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
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
import { useState } from "react";
import TambahLaporan from "@/lib/action/tambahLaporan";

export default function App({
  ipkIps,
  setIpkIps,
}: {
  ipkIps: any;
  setIpkIps: any;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [tempIpk, setTempIpk] = useState("");
  const [tempIps, setTempIps] = useState("");

  return (
    <>
      <Button onPress={onOpen} className="flex max-w-40">
        <LinkIcon /> Tambah Data
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <Form action={TambahLaporan}>
              <ModalHeader className="flex flex-col gap-1">
                Tambah IPS & IPK
              </ModalHeader>

              <div className="w-full flex flex-col gap-4">
                <ModalBody className="w-full">
                  <Input
                    errorMessage="Masukkan Semester dengan benar"
                    label="Semester"
                    labelPlacement="outside"
                    placeholder="Masukkan Semester"
                    type="number"
                    max={12}
                    min={1}
                    name="semester"
                  />
                  <div className="flex flex-row gap-2">
                    <Input
                      errorMessage="Masukkan IPS dengan benar"
                      label="IPS"
                      labelPlacement="outside"
                      placeholder="Masukkan IPS"
                      min={0}
                      max={4}
                      type="number"
                      name="ips"
                    />
                    <Input
                      isRequired
                      errorMessage="Masukkan IPK dengan benar"
                      label="IPK"
                      labelPlacement="outside"
                      placeholder="Masukkan IPK"
                      min={0}
                      max={4}
                      type="number"
                      name="ipk"
                    />
                  </div>
                </ModalBody>
                <ModalFooter className="w-full">
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" type="submit">
                    Action
                  </Button>
                </ModalFooter>
              </div>
            </Form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
