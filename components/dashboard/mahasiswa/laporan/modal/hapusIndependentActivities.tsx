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
  idIndependentActivities,
  setIdIndependentActivities,
  index,
  independentActivities,
  setIndependentActivities,
}: {
  idIndependentActivities: any;
  setIdIndependentActivities: any;
  index: number;
  independentActivities: any;
  setIndependentActivities: any;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const deleteValue = () => {
    const target = independentActivities.filter(function (item: any, i: any) {
      if (
        independentActivities[i].id &&
        (independentActivities[i].id !== undefined ||
          independentActivities[i].id !== null)
      ) {
        if (index === i) {
          setIdIndependentActivities([...idIndependentActivities, item.id]);
        }
      }
      return index !== i;
    });

    setIndependentActivities(target);

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
                Hapus Kegiatan Mandiri
              </ModalHeader>
              <ModalBody>
                Hapus Baris {index + 1} dari Kegiatan Mandiri?
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
