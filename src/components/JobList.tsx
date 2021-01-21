import { Alert } from "@welcome-ui/alert";
import { Box } from "@welcome-ui/box";
import { Text } from "@welcome-ui/text";
import React from "react";

import { ApiJob } from "../api/types";
import { AsyncResource, match } from "../helpers/asyncResource";

import JobListItem from "./JobListItem";

interface Props {
  jobListRes: AsyncResource<ApiJob[]>;
}

export default function JobList(props: Props): JSX.Element {
  const { jobListRes } = props;
  return match(jobListRes, {
    init: () => <></>,
    loading: () => (
      <Text variant="h5">Loading list of available offers...</Text>
    ),
    success: (jobList) => (
      <Box spaceY={8}>
        {jobList.map((job) => (
          <JobListItem key={job.id} job={job} />
        ))}
      </Box>
    ),
    failed: (message) => (
      <Alert>
        <Alert.Title>Unable to load list of available offers</Alert.Title>
        <span>{message}</span>
      </Alert>
    ),
  });
}
