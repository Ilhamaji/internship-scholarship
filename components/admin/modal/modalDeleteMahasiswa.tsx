import { Button } from "@heroui/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";
import DeleteIcon from "@/components/icon/iconDelete";
import { Tooltip } from "@heroui/tooltip";
import api from "@/lib/axios";

export default function App({
  userId,
  refresh,
  setRefresh,
}: {
  userId: string;
  refresh: boolean;
  setRefresh: any;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const deleteHandler = async () => {
    await api.delete(`/admin/users/delete/${userId}`);

    setRefresh(!refresh);
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
              <ModalBody>Hapus mahasiswa dengan Id {userId} ?</ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={() => deleteHandler()}>
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
