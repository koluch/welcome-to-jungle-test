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
        placeholder="Your dream job?"
        value={params.text}
        onChange={(e: React.KeyboardEvent<HTMLInputElement>) => {
          onSearch({
            ...params,
            text: e.currentTarget.value,
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
        placeholder="Group by"
        options={[
          { value: "NONE", label: "None" },
          { value: "OFFICE", label: "Office" },
          { value: "DEPARTMENT", label: "Department" },
        ]}
        value={params.grouping}
        onChange={(value: string) => {
          onSearch({
            ...params,
            grouping: value as SearchGroping,
          });
        }}
      />
    </Box>
  );
}
