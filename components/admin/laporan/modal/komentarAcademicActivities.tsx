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
import { Input, Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import CommentIcon from "@/components/icon/iconCommnet";

export default function edit({
  index,
  komentarAcademicActivities,
  setKomentarAcademicActivities,
  academicActivities,
  setAcademicActivities,
}: {
  index: number;
  komentarAcademicActivities: any;
  setKomentarAcademicActivities: any;
  academicActivities: any;
  setAcademicActivities: any;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [comment, setComment] = useState("");

  const commentAcademicActivities = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const tempArr = [...komentarAcademicActivities];
    tempArr.splice(
      index,
      1,
      comment.length === 0
        ? komentarAcademicActivities[index].length === 0
          ? academicActivities[index].comment
          : komentarAcademicActivities[index]
        : comment
    );

    setKomentarAcademicActivities(tempArr);
    onOpenChange();
  };

  return (
    <>
      <Tooltip content="Komentar">
        <span
          onClick={onOpen}
          className="my-auto text-lg text-default-400 cursor-pointer hover:text-default-600 active:opacity-50"
        >
          <CommentIcon />
        </span>
      </Tooltip>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Komentar Kegiatan Akademik
              </ModalHeader>
              <Form
                onSubmit={(e) => commentAcademicActivities(e)}
                className="w-full flex flex-col gap-4"
              >
                <ModalBody className="w-full">
                  <Textarea
                    onChange={(e) => setComment(e.target.value)}
                    errorMessage="Masukkan komentar komentar dengan benar"
                    label="Komentar"
                    labelPlacement="outside"
                    placeholder="Masukkan komentar"
                    type="text"
                    required
                    defaultValue={
                      komentarAcademicActivities[index] === undefined ||
                      komentarAcademicActivities[index] === null
                        ? academicActivities[index].comment
                        : komentarAcademicActivities[index]
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
