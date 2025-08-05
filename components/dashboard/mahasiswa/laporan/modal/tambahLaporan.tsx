"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { useState } from "react";
import { Spinner } from "@heroui/spinner";
import api from "@/lib/axios";

export default function App({
  setSubmitted,
  submitted,
}: {
  setSubmitted: any;
  submitted: any;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [semester, setSemester] = useState("");
  const [ipk, setIpk] = useState("");
  const [ips, setIps] = useState("");
  const [loading, setLoading] = useState(false);

  const tambahLaporanHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // 1️⃣ Buat object academicReports
    const academicReports = {
      semester: semester,
      ipk: ipk,
      ips: ips,
    };

    // 2️⃣ Bungkus ke dalam object dataMonev
    const dataMonev = {
      academicReports: academicReports,
    };

    // 3️⃣ Stringify dataMonev untuk dikirim via FormData
    const stringDataMonev = JSON.stringify(dataMonev);

    // 4️⃣ Inisialisasi FormData (harus fresh setiap submit)
    const formData = new FormData();
    formData.append("dataMonev", stringDataMonev);

    // Jika ingin kirim file bukti:
    // formData.append("academicReports_bukti", file);

    try {
      const response = await api.post("/monev/draft", formData);

      setSubmitted(!submitted);
      setLoading(false);
      onOpenChange(); // Tutup modal jika berhasil
    } catch (error) {
      console.error("Error adding report:", error);
      setSubmitted(!submitted);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <Button onPress={onOpen}>Tambah Laporan</Button>
      <Modal placement="top" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <Form onSubmit={tambahLaporanHandler}>
              <ModalHeader className="flex flex-col gap-1">
                Tambah Laporan Monev
              </ModalHeader>
              <ModalBody className="w-full space-y-4">
                <Input
                  autoFocus
                  className="w-full"
                  isRequired
                  errorMessage="Please enter a valid Semester"
                  label="Semester"
                  labelPlacement="outside"
                  name="semester"
                  placeholder="Enter your Semester"
                  type="number"
                  min={1}
                  max={8}
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                />
                <Input
                  className="w-full"
                  isRequired
                  errorMessage="Please enter a valid IPK"
                  label="IPK"
                  labelPlacement="outside"
                  name="ipk"
                  placeholder="Enter your IPK"
                  type="number"
                  min={0}
                  max={4}
                  step={0.01}
                  value={ipk}
                  onChange={(e) => setIpk(e.target.value)}
                />
                <Input
                  className="w-full"
                  isRequired
                  errorMessage="Please enter a valid IPS"
                  label="IPS"
                  labelPlacement="outside"
                  name="ips"
                  placeholder="Enter your IPS"
                  type="number"
                  min={0}
                  max={4}
                  step={0.01}
                  value={ips}
                  onChange={(e) => setIps(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" type="submit">
                  Simpan
                </Button>
              </ModalFooter>
            </Form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
