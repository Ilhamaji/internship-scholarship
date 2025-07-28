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
import CommentIcon from "@/components/icon/iconCommnet";

export default function edit({
  index,
  komentarIndependentActivities,
  setKomentarIndependentActivities,
  independentActivities,
  setIndependentActivities,
}: {
  index: number;
  komentarIndependentActivities: any;
  setKomentarIndependentActivities: any;
  independentActivities: any;
  setIndependentActivities: any;
}) {
  const [comment, setComment] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const commentIndependentActivities = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const tempArr = [...komentarIndependentActivities];
    tempArr.splice(
      index,
      1,
      comment.length === 0
        ? komentarIndependentActivities[index].length === 0
          ? independentActivities[index].comment
          : komentarIndependentActivities[index]
        : comment
    );

    setKomentarIndependentActivities(tempArr);
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
                Komentar Kegiatan Mandiri
              </ModalHeader>
              <Form
                onSubmit={(e) => commentIndependentActivities(e)}
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
                      komentarIndependentActivities[index] === undefined ||
                      komentarIndependentActivities[index] === null
                        ? independentActivities[index].comment
                        : komentarIndependentActivities[index]
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
