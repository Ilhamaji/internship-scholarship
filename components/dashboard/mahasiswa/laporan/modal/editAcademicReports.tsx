import React, { useState } from "react";
import { Modal, ModalContent, useDisclosure } from "@heroui/modal";
import { Tooltip } from "@heroui/tooltip";
import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import EditIcon from "@/components/icon/iconEdit";
import { set } from "date-fns";

export default function edit({
  setAcademicReportsBukti,
  academicReportsBukti,
  setAcademicReports,
  academicReports,
}: {
  setAcademicReportsBukti: any;
  academicReportsBukti: any;
  setAcademicReports: any;
  academicReports: any;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [ipk, setIpk] = useState("");
  const [ips, setIps] = useState("");
  const [bukti, setBukti] = useState<File | null>(null);

  const tambahAcademicReports = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const id = academicReports[0].id;
    const semester = academicReports[0].semester;

    setAcademicReports({
      id,
      semester,
      ipk: ipk.length > 0 ? ipk : academicReports[0].ipk,
      ips: ips.length > 0 ? ips : academicReports[0].ips,
    });

    if (bukti !== null) {
      setAcademicReportsBukti(bukti);
    }

    setIpk("");
    setIps("");
    setBukti(null);

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
                  errorMessage="Maksukkan IPS dengan benar"
                  label="IPS"
                  labelPlacement="outside"
                  name="ips"
                  placeholder="Masukkan IPS anda"
                  type="number"
                  onChange={(e) => setIps(e.target.value)}
                  defaultValue={academicReports[0].ips}
                  min={0}
                  max={4}
                  step="0.01"
                />
                <Input
                  isRequired
                  errorMessage="Maksukkan IPK dengan benar"
                  label="IPK"
                  labelPlacement="outside"
                  name="ipk"
                  placeholder="Masukkan IPK anda"
                  type="number"
                  onChange={(e) => setIpk(e.target.value)}
                  defaultValue={academicReports[0].ipk}
                  min={0}
                  max={4}
                  step="0.01"
                />
                <Input
                  errorMessage="Maksukkan bukti dengan benar"
                  label="Bukti"
                  labelPlacement="outside"
                  name="bukti"
                  placeholder="Masukkan bukti anda"
                  type="file"
                  onChange={(e) =>
                    setBukti(e.target.files ? e.target.files[0] : null)
                  }
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
