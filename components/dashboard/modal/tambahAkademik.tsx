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

export default function App({
  akademik,
  setAkademik,
}: {
  akademik: any;
  setAkademik: any;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [nama, setNama] = useState("");
  const [tglMulai, setTglMulai] = useState("");
  const [tglAkhir, setTglAkhir] = useState("");
  const [tempat, setTempat] = useState("");
  const [bukti, setBukti] = useState("");

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
                Tambah Kegiatan Akademik
              </ModalHeader>
              <Form className="w-full flex flex-col gap-4">
                <ModalBody className="w-full">
                  <Input
                    onChange={(e) => setNama(e.target.value)}
                    errorMessage="Please enter a valid username"
                    label="Nama Kegiatan"
                    labelPlacement="outside"
                    placeholder="Masukkan nama kegiatan"
                    type="text"
                  />
                  <div className="flex flex-row gap-2">
                    <Input
                      onChange={(e) => setTglMulai(e.target.value)}
                      errorMessage="Please enter a valid username"
                      label="Tanggal Mulai"
                      labelPlacement="outside"
                      type="date"
                    />
                    <Input
                      onChange={(e) => setTglAkhir(e.target.value)}
                      errorMessage="Please enter a valid username"
                      label="Tanggal Berakhir"
                      labelPlacement="outside"
                      type="date"
                    />
                  </div>
                  <Input
                    onChange={(e) => setTempat(e.target.value)}
                    errorMessage="Please enter a valid username"
                    label="Tempat"
                    labelPlacement="outside"
                    placeholder="Masukkan tempat kegiatan"
                    type="text"
                  />
                  <Input
                    onChange={(e) => setBukti(e.target.value)}
                    errorMessage="Please enter a valid username"
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
                  <Button
                    onClick={() => {
                      setAkademik([
                        ...akademik,
                        {
                          key: Object.keys(akademik).length,
                          nama: nama,
                          tglMulai: tglMulai,
                          tglAkhir: tglAkhir,
                          tempat: tempat,
                          bukti: bukti,
                        },
                      ]);
                    }}
                    color="primary"
                  >
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
