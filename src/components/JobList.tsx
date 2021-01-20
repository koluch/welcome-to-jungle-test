import { Box } from "@welcome-ui/box";
import { DatePicker } from "@welcome-ui/date-picker";
import { InputText } from "@welcome-ui/input-text";
import { Select } from "@welcome-ui/select";
import { Text } from "@welcome-ui/text";
import React from "react";

import JobListItem from "./JobListItem";

export default function JobList(): JSX.Element {
  return (
    <Box
      backgroundColor="light.900"
      borderRadius="sm"
      padding="50px"
      boxShadow="sm"
      display="flex"
      flexDirection="column"
      spaceY={20}
    >
      <Text variant="h2" textAlign={{ _: "left", sm: "center" }}>
        Our offers
      </Text>
      <Box
        display="flex"
        spaceX={{ _: 0, sm: 8 }}
        spaceY={{ _: 8, sm: 0 }}
        flexDirection={{ _: "column", sm: "row" }}
        alignItems={{ _: "stretch", sm: "center" }}
      >
        <InputText placeholder="Your dream job?" />
        <Select placeholder="Contract type" />
        <DatePicker placeholder="Published after" />
        <Select placeholder="Group by" />
      </Box>
      <Box spaceY={8}>
        <JobListItem />
        <JobListItem />
        <JobListItem />
        <JobListItem />
      </Box>
    </Box>
  );
}
