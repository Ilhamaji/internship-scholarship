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
  idTargetAcademicActivities,
  setIdTargetAcademicActivities,
  index,
  targetAcademicActivities,
  setTargetAcademicActivities,
}: {
  idTargetAcademicActivities: any;
  setIdTargetAcademicActivities: any;
  index: number;
  targetAcademicActivities: any;
  setTargetAcademicActivities: any;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const deleteValue = () => {
    const target = targetAcademicActivities.filter(function (
      item: any,
      i: any
    ) {
      if (
        targetAcademicActivities[i].id &&
        (targetAcademicActivities[i].id !== undefined ||
          targetAcademicActivities[i].id !== null)
      ) {
        if (index === i) {
          setIdTargetAcademicActivities([
            ...idTargetAcademicActivities,
            item.id,
          ]);
        }
      }
      return index !== i;
    });

    setTargetAcademicActivities(target);

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
                Hapus Kegiatan Akademik
              </ModalHeader>
              <ModalBody>
                Hapus Baris {index + 1} dari Target Kegiatan Akademik?
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
