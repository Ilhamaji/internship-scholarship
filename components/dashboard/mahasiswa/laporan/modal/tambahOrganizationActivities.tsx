"use client";

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
  organizationActivities,
  setOrganizationActivities,
}: {
  organizationActivities: any;
  setOrganizationActivities: any;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [ukmName, setUkmName] = useState("");
  const [level, setLevel] = useState("");
  const [position, setPosition] = useState("");
  const [buktiUrl, setBuktiUrl] = useState("");

  const tambahAcademicActivity = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (organizationActivities === undefined) {
      setOrganizationActivities([
        {
          ukmName: ukmName,
          level: level,
          position: position,
          buktiUrl: buktiUrl,
        },
      ]);
    } else {
      setOrganizationActivities([
        ...organizationActivities,
        {
          ukmName: ukmName,
          level: level,
          position: position,
          buktiUrl: buktiUrl,
        },
      ]);
    }

    setUkmName("");
    setLevel("");
    setPosition("");
    setBuktiUrl("");

    onOpenChange();
  };

  return (
    <>
      <Button onPress={onOpen} className="flex max-w-40">
        <LinkIcon /> Tambah Data
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Tambah Kegiatan Organisasi Mahasiswa
              </ModalHeader>
              <Form
                onSubmit={(e) => tambahAcademicActivity(e)}
                className="w-full flex flex-col gap-4"
              >
                <ModalBody className="w-full">
                  <Input
                    onChange={(e) => setUkmName(e.target.value)}
                    errorMessage="Masukkan nama UKM dengan benar"
                    label="Nama UKM"
                    labelPlacement="outside"
                    placeholder="Masukkan nama UKM"
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
                    <SelectItem key={"Perguruan Tinggi"}>
                      Perguruan Tinggi
                    </SelectItem>
                    <SelectItem key={"Regional"}>Regional</SelectItem>
                    <SelectItem key={"Nasional"}>Nasional</SelectItem>
                    <SelectItem key={"Internasional"}>Internasional</SelectItem>
                  </Select>
                  <Select
                    className="w-full"
                    errorMessage="Pilih keikutsertaan dengan benar"
                    label="Keikutsertaan"
                    labelPlacement="inside"
                    placeholder="Pilih keikutsertaan"
                    onChange={(e) => setPosition(e.target.value)}
                    required
                  >
                    <SelectItem key={"Ketua"}>Ketua</SelectItem>
                    <SelectItem key={"Wakil Ketua"}>Wakil Ketua</SelectItem>
                    <SelectItem key={"Sekertaris"}>Sekertaris</SelectItem>
                    <SelectItem key={"Bendahara"}>Bendahara</SelectItem>
                    <SelectItem key={"Divisi"}>Divisi</SelectItem>
                    <SelectItem key={"Anggota"}>Anggota</SelectItem>
                  </Select>
                  <Input
                    onChange={(e) => setBuktiUrl(e.target.value)}
                    errorMessage="Masukkan bukti kegiatan dengan benar"
                    label="Bukti"
                    labelPlacement="outside"
                    placeholder="Masukkan bukti kegiatan"
                    type="file"
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
