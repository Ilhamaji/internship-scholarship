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
                Tambah Prestasi
              </ModalHeader>
              <Form className="w-full flex flex-col gap-4">
                <ModalBody className="w-full">
                  <Input
                    isRequired
                    errorMessage="Please enter a valid username"
                    label="Nama Prestasi"
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
                  <Select className="" label="Pilih Tingkat Juara" size={"sm"}>
                    <SelectItem key={1}>Juara 1</SelectItem>
                    <SelectItem key={2}>Juara 2</SelectItem>
                    <SelectItem key={3}>Juara 3</SelectItem>
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
