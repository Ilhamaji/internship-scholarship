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
  idTargetIndependentActivities,
  setIdTargetIndependentActivities,
  index,
  targetIndependentActivities,
  setTargetIndependentActivities,
}: {
  idTargetIndependentActivities: any;
  setIdTargetIndependentActivities: any;
  index: number;
  targetIndependentActivities: any;
  setTargetIndependentActivities: any;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const deleteValue = () => {
    const target = targetIndependentActivities.filter(function (
      item: any,
      i: any
    ) {
      if (
        targetIndependentActivities[i].id &&
        (targetIndependentActivities[i].id !== undefined ||
          targetIndependentActivities[i].id !== null)
      ) {
        if (index === i) {
          setIdTargetIndependentActivities([
            ...idTargetIndependentActivities,
            item.id,
          ]);
        }
      }
      return index !== i;
    });

    setTargetIndependentActivities(target);
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
                Hapus Target Kegiatan Mandiri
              </ModalHeader>
              <ModalBody>
                Hapus Baris {index + 1} dari Target Kegiatan Mandiri?
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
