import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";
import { Tooltip } from "@heroui/tooltip";
import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import EditIcon from "@/components/icon/iconEdit";

export default function edit({
  index,
  organizationActivities,
  setOrganizationActivities,
}: {
  index: number;
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

    const newArray = organizationActivities.map((v: any, i: any) => {
      if (i === index) {
        const data = {
          ukmName:
            ukmName.length === 0
              ? organizationActivities[index].ukmName
              : ukmName,
          level:
            level.length === 0 ? organizationActivities[index].level : level,
          position:
            position.length === 0
              ? organizationActivities[index].position
              : position,
          buktiUrl:
            buktiUrl.length === 0
              ? organizationActivities[index].buktiUrl
              : buktiUrl,
        };

        return data;
      }

      return v;
    });
    setOrganizationActivities(newArray);

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
                Edit Kegiatan Akademik
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
                    defaultValue={organizationActivities[index].ukmName}
                    required
                  />
                  <Select
                    className="w-full"
                    errorMessage="Pilih tingkatan dengan benar"
                    label="Tingkatan"
                    labelPlacement="inside"
                    placeholder="Pilih tingkatan"
                    onChange={(e) => setLevel(e.target.value)}
                    defaultSelectedKeys={[
                      `${organizationActivities[index].level}`,
                    ]}
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
                    defaultSelectedKeys={[
                      `${organizationActivities[index].position}`,
                    ]}
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
                    defaultValue={organizationActivities[index].buktiUrl}
                    required={
                      organizationActivities[index].buktiUrl ? false : true
                    }
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
