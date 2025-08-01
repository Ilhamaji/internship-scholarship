"use client";

import React from "react";
import { Button } from "@heroui/button";
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
import api from "@/lib/axios";

export default function App({laporanId, setMessage}:{laporanId:any, setMessage:any}) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    
    const pengajuanHandler = async (e) => {
        e.preventDefault();
        console.log(laporanId);
        

        await api.patch(`/monev/draft/${laporanId}/submit`);

        setMessage("success");
        onOpenChange();
    }

  return (
    <>
      <Button onPress={onOpen} size="lg" className="w-full text-white" color="success">
         Tambah Data
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Pengajuan
              </ModalHeader>
              <Form
                onSubmit={(e) => pengajuanHandler(e)}
                className="w-full flex flex-col gap-4"
              >
                <ModalBody className="w-full flex">
                  Apakah anda yakin melakukan pengajuan laporan ini ?
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
