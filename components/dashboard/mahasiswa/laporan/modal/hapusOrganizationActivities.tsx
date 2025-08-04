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
  idOrganizationActivities,
  setIdOrganizationActivities,
  index,
  organizationActivities,
  setOrganizationActivities,
}: {
  idOrganizationActivities: any;
  setIdOrganizationActivities: any;
  index: number;
  organizationActivities: any;
  setOrganizationActivities: any;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const deleteValue = () => {
    const target = organizationActivities.filter(function (item: any, i: any) {
      if (
        organizationActivities[i].id &&
        (organizationActivities[i].id !== undefined ||
          organizationActivities[i].id !== null)
      ) {
        if (index === i) {
          setIdOrganizationActivities([...organizationActivities, item.id]);
        }
      }
      return index !== i;
    });

    organizationActivities(target);

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
                Hapus Kegiatan Organisasi
              </ModalHeader>
              <ModalBody>
                Hapus Baris {index + 1} dari Kegiatan Organisasi?
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
