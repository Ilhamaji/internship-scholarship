import { Button } from "@heroui/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";
import { DeleteIcon } from "./edit";
import { Tooltip } from "@heroui/tooltip";
import api from "@/lib/axios";

export default function App({
  laporanId,
  setSubmitted,
  submitted,
}: {
  laporanId: string;
  setSubmitted: any;
  submitted: boolean;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const deleteHandler = async () => {
    await api.delete(`/monev/laporan/${laporanId}`);

    setSubmitted(!submitted);
    onOpenChange();
  };

  return (
    <>
      <Tooltip content="Hapus">
        <span
          onClick={onOpen}
          className="my-auto text-lg text-default-400 cursor-pointer hover:text-red-500 active:opacity-50"
        >
          <DeleteIcon />
        </span>
      </Tooltip>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Hapus Laporan
              </ModalHeader>
              <ModalBody className="flex">Hapus id {laporanId} ?</ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={deleteHandler}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
