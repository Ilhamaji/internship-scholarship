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
  idStudentAchievements,
  setIdStudentAchievements,
  index,
  studentsAchievements,
  setStudentsAchievements,
}: {
  idStudentAchievements: any;
  setIdStudentAchievements: any;
  index: number;
  studentsAchievements: any;
  setStudentsAchievements: any;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const deleteValue = () => {
    const target = studentsAchievements.filter(function (item: any, i: any) {
      if (
        studentsAchievements[i].id &&
        (studentsAchievements[i].id !== undefined ||
          studentsAchievements[i].id !== null)
      ) {
        if (index === i) {
          setIdStudentAchievements([...idStudentAchievements, item.id]);
        }
      }
      return index !== i;
    });

    setStudentsAchievements(target);

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
                Hapus Prestasi Mahasiswa
              </ModalHeader>
              <ModalBody>
                Hapus Baris {index + 1} dari Prestasi Mahasiswa?
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
