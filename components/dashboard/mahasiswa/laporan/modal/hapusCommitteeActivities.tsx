import { Button } from "@heroui/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";
import DeleteIcon from "@/components/dashboard/mahasiswa/laporan/icon/iconDelete";
import { Tooltip } from "@heroui/tooltip";

export default function App({
  index,
  committeeActivities,
  setCommitteeActivities,
}: {
  index: number;
  committeeActivities: any;
  setCommitteeActivities: any;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const deleteValue = () => {
    setCommitteeActivities(committeeActivities.splice(index, 1));

    onOpenChange();
  };

  return (
    <>
      <Tooltip content="delete">
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
                Hapus Kegiatan Kepanitiaan
              </ModalHeader>
              <ModalBody>
                Hapus Baris {index + 1} dari Kegiatan Kepanitiaan?
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="danger" onPress={deleteValue}>
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
