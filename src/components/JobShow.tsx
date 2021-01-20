import { Box } from "@welcome-ui/box";
import { Button } from "@welcome-ui/button";
import { Modal, useModalState } from "@welcome-ui/modal";
import React, { useEffect } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function JobShow(props: Props): JSX.Element {
  const { isOpen, onClose } = props;
  const modal = useModalState({ visible: isOpen });
  useEffect(() => {
    if (isOpen) {
      modal.show();
    } else {
      modal.hide();
    }
  }, [modal, isOpen]);
  return (
    <Modal {...modal} ariaLabel="Job details" onClose={onClose}>
      <Modal.Title>(Job description)</Modal.Title>
      <Modal.Content>(Job details)</Modal.Content>
      <Modal.Footer>
        <Box width={1} display="flex" justifyContent="center">
          <Button>Apply</Button>
        </Box>
      </Modal.Footer>
    </Modal>
  );
}
