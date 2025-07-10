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
import { Select, SelectSection, SelectItem } from "@heroui/select";

export default function App() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
                Tambah Kegiatan Kepanitiaan & penugasan
              </ModalHeader>
              <Form className="w-full flex flex-col gap-4">
                <ModalBody className="w-full">
                  <Input
                    isRequired
                    errorMessage="Please enter a valid username"
                    label="Nama Kegiatan"
                    labelPlacement="outside"
                    name="username"
                    placeholder="Masukkan nama kegiatan"
                    type="text"
                  />
                  <Input
                    isRequired
                    errorMessage="Please enter a valid username"
                    label="Tanggal"
                    labelPlacement="outside"
                    name="tglMulai"
                    type="date"
                  />
                  <Input
                    isRequired
                    errorMessage="Please enter a valid username"
                    label="Tempat Kegiatan"
                    labelPlacement="outside"
                    name="username"
                    placeholder="Masukkan nama kegiatan"
                    type="text"
                  />
                  <Select className="" label="Pilih Keikutsertaan" size={"sm"}>
                    <SelectItem key={1}>Ketua</SelectItem>
                    <SelectItem key={2}>Wakil Ketua</SelectItem>
                    <SelectItem key={3}>Sekretaris</SelectItem>
                    <SelectItem key={4}>Anggota</SelectItem>
                  </Select>
                  <Input
                    isRequired
                    errorMessage="Please enter a valid username"
                    label="Bukti"
                    labelPlacement="outside"
                    name="username"
                    placeholder="Masukkan tempat kegiatan"
                    type="file"
                  />
                </ModalBody>
                <ModalFooter className="w-full">
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" type="submit">
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
