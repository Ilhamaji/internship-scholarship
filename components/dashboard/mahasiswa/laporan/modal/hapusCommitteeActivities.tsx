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

export default function App({
  idCommitteeActivities,
  setIdCommitteeActivities,
  index,
  committeeActivities,
  setCommitteeActivities,
}: {
  idCommitteeActivities: any;
  setIdCommitteeActivities: any;
  index: number;
  committeeActivities: any;
  setCommitteeActivities: any;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const deleteValue = () => {
    const target = committeeActivities.filter(function (item: any, i: any) {
      if (
        committeeActivities[i].id &&
        (committeeActivities[i].id !== undefined ||
          committeeActivities[i].id !== null)
      ) {
        if (index === i) {
          setIdCommitteeActivities([...idCommitteeActivities, item.id]);
        }
      }
      return index !== i;
    });

    setCommitteeActivities(target);

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
