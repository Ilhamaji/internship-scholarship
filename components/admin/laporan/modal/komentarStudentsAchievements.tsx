import React, { useEffect, useState } from "react";
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
import CommentIcon from "@/components/icon/iconCommnet";

export default function edit({
  komentarStudentsAchievements,
  setKomentarStudentsAchievements,
  studentsAchievements,
  setStudentsAchievements,
  index,
}: {
  komentarStudentsAchievements: any;
  setKomentarStudentsAchievements: any;
  studentsAchievements: any;
  setStudentsAchievements: any;
  index: number;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [comment, setComment] = useState("");

  const commentStudentsAchievements = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const tempArr = [...komentarStudentsAchievements];
    tempArr.splice(
      index,
      1,
      comment.length === 0
        ? komentarStudentsAchievements[index].length === 0
          ? studentsAchievements[index].comment
          : komentarStudentsAchievements[index]
        : comment
    );

    setKomentarStudentsAchievements(tempArr);
    onOpenChange();
  };

  return (
    <>
      <Tooltip content="Edit">
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
                Komentar Prestasi Mahasiswa
              </ModalHeader>
              <Form
                onSubmit={(e) => commentStudentsAchievements(e)}
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
                    defaultValue={
                      komentarStudentsAchievements[index] === undefined ||
                      komentarStudentsAchievements[index] === null
                        ? studentsAchievements[index].comment
                        : komentarStudentsAchievements[index]
                    }
                    required
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
