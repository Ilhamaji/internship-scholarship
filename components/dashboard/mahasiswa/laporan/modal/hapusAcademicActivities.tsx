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
  setIdAcademicActivities,
  idAcademicActivities,
  index,
  academicActivities,
  setAcademicActivities,
}: {
  setIdAcademicActivities: any;
  idAcademicActivities: any;
  index: number;
  academicActivities: any;
  setAcademicActivities: any;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const deleteValue = () => {
    const target = academicActivities.filter(function (item: any, i: any) {
      if (
        academicActivities[i].id &&
        (academicActivities[i].id !== undefined ||
          academicActivities[i].id !== null)
      ) {
        if (index === i) {
          setIdAcademicActivities([...idAcademicActivities, item.id]);
        }
      }
      return index !== i;
    });

    setAcademicActivities(target);

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
                Hapus Baris {index + 1} dari Kegiatan Akademik?
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
