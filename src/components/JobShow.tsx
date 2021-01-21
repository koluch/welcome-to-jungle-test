import { Box } from "@welcome-ui/box";
import { Button } from "@welcome-ui/button";
import { Modal, useModalState } from "@welcome-ui/modal";
import React, { useEffect } from "react";

import { ApiJob } from "../api/types";

interface Props {
  job: ApiJob | null;
  onClose: () => void;
}

export default function JobShow(props: Props): JSX.Element {
  const { job, onClose } = props;
  const isOpen = job != null;
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
      {job != null && (
        <>
          <Modal.Title>{job.name}</Modal.Title>
          <Modal.Content>(Job details)</Modal.Content>
          <Modal.Footer>
            <Box width={1} display="flex" justifyContent="center">
              <Button>Apply</Button>
            </Box>
          </Modal.Footer>
        </>
      )}
    </Modal>
  );
}
