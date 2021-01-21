import { Box } from "@welcome-ui/box";
import { DatePicker } from "@welcome-ui/date-picker";
import { InputText } from "@welcome-ui/input-text";
import { Select } from "@welcome-ui/select";
import React from "react";

interface Props {}

export default function SearchForm(_props: Props): JSX.Element {
  return (
    <Box
      display="flex"
      spaceX={{ _: 0, sm: 8 }}
      spaceY={{ _: 8, sm: 0 }}
      flexDirection={{ _: "column", sm: "row" }}
      alignItems={{ _: "stretch", sm: "center" }}
    >
      <InputText placeholder="Your dream job?" />
      <Select placeholder="Contract type" options={[]} value="" />
      <DatePicker placeholder="Published after" />
      <Select placeholder="Group by" options={[]} value="" />
    </Box>
  );
}
