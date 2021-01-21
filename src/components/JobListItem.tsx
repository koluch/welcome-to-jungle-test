import { Box } from "@welcome-ui/box";
import { Button } from "@welcome-ui/button";
import { Card } from "@welcome-ui/card";
import { Text } from "@welcome-ui/text";
import React from "react";
import { Link } from "react-router-dom";

import { useStringLocalization } from "../api/helpers";
import { ApiJob } from "../api/types";

interface Props {
  job: ApiJob;
}

export default function JobListItem(props: Props): JSX.Element {
  const { job } = props;
  const localString = useStringLocalization();
  return (
    <Card lineHeight="2">
      <Card.Body
        display="flex"
        justifyContent="space-between"
        spaceX={{ _: 0, sm: 16 }}
        spaceY={{ _: 16, sm: 0 }}
        flexDirection={{ _: "column", sm: "row" }}
      >
        <Box spaceY={{ _: 4 }}>
          <Text variant="h5">{job.name}</Text>
          <Text variant="body4" color="light.200">
            {localString(job.contract_type)} - {job.office.name}
          </Text>
        </Box>
        <Button as={Link} to={`/show/${job.id}`} replace>
          See more
        </Button>
      </Card.Body>
    </Card>
  );
}
