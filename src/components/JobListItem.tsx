import { Box } from "@welcome-ui/box";
import { Button } from "@welcome-ui/button";
import { Card } from "@welcome-ui/card";
import { Text } from "@welcome-ui/text";
import { x } from "@xstyled/styled-components";
import React from "react";
import { Link } from "react-router-dom";

import { useStringLocalization } from "../api/helpers";
import { ApiJob } from "../api/types";
import { MatchIndexes, WithMatches } from "../helpers/searching";

function highlight(value: string, matches: MatchIndexes[]): React.ReactNode {
  if (matches.length === 0) {
    return value;
  }
  const result = [];
  for (let i = 0; i < matches.length; i += 1) {
    const match = matches[i];
    const prevMatchEnd = i > 0 ? matches[i - 1][1] : 0;
    result.push(value.substring(prevMatchEnd, match[0]));
    result.push(
      <x.span color="warning.500">{value.substring(match[0], match[1])}</x.span>
    );
    if (i === matches.length - 1) {
      result.push(value.substring(match[1]));
    }
  }
  return result;
}

interface Props {
  job: WithMatches<ApiJob>;
}

export default function JobListItem(props: Props): JSX.Element {
  const { item: job, matches } = props.job;
  const localString = useStringLocalization();

  const nameMatches = "name" in matches ? matches["name"] : [];
  const officeMatches = "office.name" in matches ? matches["office.name"] : [];

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
          <Text variant="h5">{highlight(job.name, nameMatches)}</Text>
          <Text variant="body4" color="light.200">
            {localString(job.contract_type)} -{" "}
            {highlight(job.office.name, officeMatches)}
          </Text>
        </Box>
        <Button as={Link} to={`/show/${job.id}`} replace>
          See more
        </Button>
      </Card.Body>
    </Card>
  );
}
