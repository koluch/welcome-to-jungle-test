import { Box } from "@welcome-ui/box";
import { Button } from "@welcome-ui/button";
import { Card } from "@welcome-ui/card";
import { Text } from "@welcome-ui/text";
import React from "react";
import { Link } from "react-router-dom";

export default function JobListItem(): JSX.Element {
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
          <Text variant="h5">Job Name</Text>
          <Text variant="body4" color="light.200">
            Contract Type - Office Name
          </Text>
        </Box>
        <Link to={"/show/42"} replace style={{ textDecoration: "none" }}>
          <Button>See more</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}
