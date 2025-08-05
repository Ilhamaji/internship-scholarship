import React, { useState } from "react";
import { Modal, ModalContent, useDisclosure } from "@heroui/modal";
import { Tooltip } from "@heroui/tooltip";
import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import EditIcon from "@/components/icon/iconEdit";

export default function edit({
  semester,
  targetNextSemester,
  setTargetNextSemester,
}: {
  semester: any;
  targetNextSemester: any;
  setTargetNextSemester: any;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [ipk, setIpk] = useState("");
  const [ips, setIps] = useState("");

  const tambahAcademicReports = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setTargetNextSemester([
      {
        semester: semester,
        ipkTarget: ipk.length > 0 ? ipk : targetNextSemester[0].ipkTarget,
        ipsTarget: ips.length > 0 ? ips : targetNextSemester[0].ipsTarget,
      },
    ]);

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
              <Form onSubmit={tambahAcademicReports} className="p-10">
                <Input
                  isRequired
                  errorMessage="Maksukkan IPK dengan benar"
                  label="IPK"
                  labelPlacement="outside"
                  name="ipk"
                  placeholder="Masukkan IPK anda"
                  type="ipk"
                  onChange={(e) => setIpk(e.target.value)}
                  defaultValue={targetNextSemester[0].ipkTarget}
                  min={0}
                  max={4}
                />
                <Input
                  isRequired
                  errorMessage="Maksukkan IPS dengan benar"
                  label="IPS"
                  labelPlacement="outside"
                  name="ips"
                  placeholder="Masukkan IPS anda"
                  type="ips"
                  onChange={(e) => setIps(e.target.value)}
                  defaultValue={targetNextSemester[0].ipsTarget}
                  min={0}
                  max={4}
                />
                <Button type="submit">Submit</Button>
              </Form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
