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

export default function App() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [semester, setSemester] = useState("");
  const [ipk, setIpk] = useState("");
  const [ips, setIps] = useState("");
  const [loading, setLoading] = useState(false);

  const tambahLaporanHandler = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/monev/draft", {
        academicReports: {
          semester: semester,
          ipk: ipk,
          ips: ips,
        },
      });

      setLoading(false);

      onOpenChange();
    } catch (error) {
      console.error("Error adding report:", error);
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

  if (!loading) {
    return (
      <>
        <Button onPress={onOpen}>Open Modal</Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <Form onSubmit={(e) => tambahLaporanHandler(e)}>
                <ModalHeader className="flex flex-col gap-1">
                  Modal Title
                </ModalHeader>
                <ModalBody className="w-full">
                  <Input
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
                    min={0.0}
                    max={4.0}
                    step={0.01}
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
                    min={0.0}
                    max={4.0}
                    step={0.01}
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
}
