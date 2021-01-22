import { Box } from "@welcome-ui/box";
import { Text } from "@welcome-ui/text";
import { createGlobalStyle } from "@xstyled/styled-components";
import React, { useMemo, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";

import { ApiData, ApiJob } from "../api/types";
import * as ar from "../helpers/asyncResource";
import {
  DEFAULT_PARAMS,
  SearchParams,
  useSearchResults,
} from "../helpers/searching";

import JobShow from "./JobShow";
import SearchForm from "./SearchForm";
import SearchResults from "./SearchResults";

const GlobalStyle = createGlobalStyle`
  :root {
    font-size: 20px;
  }
  
  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
`;

interface Props {
  dataRes: ar.AsyncResource<ApiData>;
}

function Root(props: Props): JSX.Element {
  const { dataRes } = props;

  const history = useHistory();

  const jobsRes = useMemo(() => {
    return ar.map(dataRes, (data) => data.jobs);
  }, [dataRes]);

  const openJobMatch = useRouteMatch<{ id: string }>("/show/:id");
  const openJobRes: ar.AsyncResource<ApiJob | null> = useMemo(() => {
    return ar.match(jobsRes, {
      init: () => ar.init(),
      loading: () => ar.loading(),
      failed: (message) => ar.failed(message),
      success: (jobs) => {
        if (openJobMatch == null) {
          return ar.success(null);
        }
        const jobId = openJobMatch.params.id;
        if (jobId == null) {
          return ar.failed("Id url parameter can not be null");
        }
        const findJob = jobs.find(({ id }) => id === parseInt(jobId));
        if (findJob == null) {
          return ar.failed(`Unable to find job by id ${jobId}`);
        }
        return ar.success(findJob);
      },
    });
  }, [openJobMatch, jobsRes]);

  const [searchParams, setSearchParams] = useState<SearchParams>(
    DEFAULT_PARAMS
  );

  const searchResultsRes = useSearchResults(jobsRes, searchParams);

  return (
    <>
      <GlobalStyle />
      <Box
        display="flex"
        w="100vw"
        flex="1"
        flexDirection="column"
        alignItems={{ _: "stretch", sm: "center" }}
        backgroundColor="nude.100"
        padding={{ _: 0, sm: 32 }}
      >
        <Box
          backgroundColor="light.900"
          borderRadius="sm"
          padding="50px"
          boxShadow="sm"
          display="flex"
          flexDirection="column"
          maxWidth="920px"
          spaceY={20}
        >
          <Text variant="h2" textAlign={{ _: "left", sm: "center" }}>
            Our offers
          </Text>
          <SearchForm
            availableJobsRes={jobsRes}
            params={searchParams}
            onSearch={setSearchParams}
          />
          <SearchResults searchResultsRes={searchResultsRes} />
        </Box>
      </Box>
      <JobShow
        isOpen={openJobMatch != null}
        jobRes={openJobRes}
        onClose={() => {
          history.replace("/");
        }}
      />
    </>
  );
}

export default Root;
