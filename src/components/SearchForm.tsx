import { Box } from "@welcome-ui/box";
import { DatePicker } from "@welcome-ui/date-picker";
import { InputText } from "@welcome-ui/input-text";
import { Select } from "@welcome-ui/select";
import React from "react";

import { useStringLocalization } from "../api/helpers";
import { ApiJob } from "../api/types";
import { AsyncResource, isSuccess } from "../helpers/asyncResource";
import { SearchGroping, SearchParams } from "../helpers/searching";

interface Props {
  availableJobsRes: AsyncResource<ApiJob[]>;
  params: SearchParams;
  onSearch: (newParams: SearchParams) => void;
}

export default function SearchForm(props: Props): JSX.Element {
  const { availableJobsRes, params, onSearch } = props;

  const localString = useStringLocalization();

  // todo: optimize
  const availableContractTypes: string[] = [];
  if (isSuccess(availableJobsRes)) {
    for (const job of availableJobsRes.value) {
      const jobType = localString(job.contract_type);
      if (availableContractTypes.indexOf(jobType) === -1) {
        availableContractTypes.push(jobType);
      }
    }
  }

  return (
    <Box
      display="grid"
      gridAutoFlow={{ _: "row", sm: "column" }}
      gridAutoColumns="1fr"
      gap={8}
    >
      <InputText
        isClearable
        placeholder="Your dream job?"
        value={params.text}
        onChange={(e: { target: { value: string | undefined } }) => {
          const value = e.target.value;
          onSearch({
            ...params,
            text: value != null ? value : "",
          });
        }}
      />
      <Select
        isClearable
        placeholder="Contract type"
        options={availableContractTypes.map((jobType) => ({
          value: jobType,
          label: jobType,
        }))}
        value={params.jobType}
        onChange={(value: string) => {
          onSearch({
            ...params,
            jobType: value,
          });
        }}
      />
      <Box>
        <DatePicker
          placeholder="Published after"
          inputRef={React.createRef()}
          value={0}
          onChange={(date: Date | undefined) => {
            onSearch({
              ...params,
              publishedAfter: date || null,
            });
          }}
        />
      </Box>
      <Select
        isClearable
        placeholder="Group by"
        options={[
          { value: "OFFICE", label: "Office" },
          { value: "DEPARTMENT", label: "Department" },
        ]}
        value={params.grouping === "NONE" ? undefined : params.grouping}
        onChange={(value: string | undefined) => {
          onSearch({
            ...params,
            grouping: value == null ? "NONE" : (value as SearchGroping),
          });
        }}
      />
    </Box>
  );
}
