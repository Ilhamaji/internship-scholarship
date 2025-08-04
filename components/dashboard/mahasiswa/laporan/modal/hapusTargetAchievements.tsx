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
  idTargetAchievements,
  setIdTargetAchievements,
  index,
  targetAchievements,
  setTargetAchievements,
}: {
  idTargetAchievements: any;
  setIdTargetAchievements: any;
  index: number;
  targetAchievements: any;
  setTargetAchievements: any;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const deleteValue = () => {
    const target = targetAchievements.filter(function (item: any, i: any) {
      if (
        targetAchievements[i].id &&
        (targetAchievements[i].id !== undefined ||
          targetAchievements[i].id !== null)
      ) {
        if (index === i) {
          setIdTargetAchievements([...idTargetAchievements, item.id]);
        }
      }
      return index !== i;
    });

    setTargetAchievements(target);

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
                Hapus Target Prestasi
              </ModalHeader>
              <ModalBody>
                Hapus Baris {index + 1} dari Target Prestasi?
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
