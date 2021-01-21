import { Alert } from "@welcome-ui/alert";
import { Box } from "@welcome-ui/box";
import { Button } from "@welcome-ui/button";
import { Modal, useModalState } from "@welcome-ui/modal";
import { Text } from "@welcome-ui/text";
import React, { useEffect } from "react";

import { useStringLocalization } from "../api/helpers";
import { ApiJob } from "../api/types";
import { AsyncResource, isSuccess, match } from "../helpers/asyncResource";

import InlineHtml from "./InlineHtml";

interface Props {
  jobRes: AsyncResource<ApiJob | null>;
  applyUrl: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function JobShow(props: Props): JSX.Element {
  const { applyUrl, jobRes, isOpen, onClose } = props;
  const modal = useModalState({ visible: isOpen });
  const localString = useStringLocalization();
  useEffect(() => {
    if (isOpen) {
      modal.show();
    } else {
      modal.hide();
    }
  }, [modal, isOpen]);
  return (
    <Modal {...modal} ariaLabel="Job details" onClose={onClose}>
      <>
        <Modal.Title>
          {isSuccess(jobRes) && jobRes.value != null
            ? jobRes.value.name
            : "..."}
        </Modal.Title>
        <Modal.Content>
          <Box spaceY={16}>
            {match(jobRes, {
              init: () => <></>,
              loading: () => (
                <Text variant="h5">Loading job description...</Text>
              ),
              failed: (message) => (
                <Alert>
                  <Alert.Title>Unable to load job description</Alert.Title>
                  <span>{message}</span>
                </Alert>
              ),
              success: (job) => {
                if (job == null) {
                  return <></>;
                }
                return (
                  <>
                    <InlineHtml html={job.description} />
                    <Text variant="h5">Recruitment process</Text>
                    <InlineHtml html={job.recruitment_process} />
                    <Text variant="h5">Office location</Text>
                    <Text>
                      {job.office.address}, {job.office.city},{" "}
                      {localString(job.office.country)}
                    </Text>
                  </>
                );
              },
            })}
          </Box>
        </Modal.Content>
        <Modal.Footer>
          <Box width={1} display="flex" justifyContent="center">
            <Button
              as="a"
              href={applyUrl}
              target="_blank"
              rel="noopener nofollow"
            >
              Apply
            </Button>
          </Box>
        </Modal.Footer>
      </>
    </Modal>
  );
}
