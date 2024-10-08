"use client";

import actions from "@/actions";
import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  useDisclosure,
  Modal,
  ModalHeader,
  ModalBody,
  ModalContent,
  ModalFooter,
} from "@nextui-org/react";
import { useState } from "react";

export function DropdownComp({ id, title = "" }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [blockModal, setBlockModal] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setBlockModal(true);
    await actions.deleteCampground(id);
    setBlockModal(false);
    onClose();
  }

  return (
    <>
      <Dropdown className="min-w-24 z-0 rounded-lg">
        <DropdownTrigger>
          <Button isIconOnly>+</Button>
        </DropdownTrigger>
        <DropdownMenu className="rounded-lg overflow-hidden p-0">
          <DropdownItem key="visit" href={`/${id}`} className="rounded-none">
            Visit
          </DropdownItem>
          <DropdownItem
            key="edit"
            href={`/${id}/edit`}
            color="primary"
            className="rounded-none"
          >
            Edit
          </DropdownItem>
          <DropdownItem
            key="delete"
            color="danger"
            onPress={onOpen}
            className="rounded-none"
          >
            Delete
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={!blockModal}
        hideCloseButton
      >
        <ModalContent>
          {(onClose) => (
            <div>
              <ModalHeader className="flex flex-col gap-1">
                Delete Campground
              </ModalHeader>
              <ModalBody>Are you sure you want to delete {title}?</ModalBody>
              <ModalFooter>
                <Button onPress={onClose} isDisabled={blockModal}>
                  Close
                </Button>
                <form onSubmit={handleSubmit}>
                  <Button
                    type="submit"
                    color="danger"
                    size="md"
                    isLoading={blockModal}
                  >
                    Delete
                  </Button>
                </form>
              </ModalFooter>
            </div>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
