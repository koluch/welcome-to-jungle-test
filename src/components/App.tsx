import { Box } from "@welcome-ui/box";
import { Text } from "@welcome-ui/text";
import { createGlobalStyle } from "@xstyled/styled-components";
import React, { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";

import { fetchData } from "../api";
import { ApiData, ApiJob } from "../api/types";
import * as ar from "../helpers/asyncResource";
import { isSuccess } from "../helpers/asyncResource";

import JobList from "./JobList";
import JobShow from "./JobShow";
import SearchForm from "./SearchForm";

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

function useData(): ar.AsyncResource<ApiData> {
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ApiData | null>(null);
  useEffect(() => {
    fetchData()
      .then((result) => {
        setData(result);
      })
      .catch((e) => {
        setError(e.message);
      });
  }, []);
  if (error != null) {
    return ar.failed(error);
  }
  if (data != null) {
    return ar.success(data);
  }
  return ar.loading();
}

function App(): JSX.Element {
  const history = useHistory();

  const dataRes = useData();

  const jobsRes = ar.map(dataRes, (data) => data.jobs);
  const applyUrlRes = ar.map(dataRes, (data) => {
    const website = data.websites.find(
      ({ reference }) => reference === "wttj_fr"
    );
    return website != null ? website.root_url : null;
  });

  const openJobMatch = useRouteMatch<{ id: string }>("/show/:id");
  const openJobRes: ar.AsyncResource<ApiJob | null> = ar.match(jobsRes, {
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

  return (
    <>
      <GlobalStyle />
      <Box
        display="flex"
        width={1}
        flex="1"
        justifyContent="center"
        alignItems="flex-start"
        backgroundColor="nude.100"
        paddingTop={{ _: 0, sm: 32 }}
        paddingBottom={{ _: 0, sm: 32 }}
      >
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
          <SearchForm />
          <JobList jobListRes={ar.map(dataRes, (data) => data.jobs)} />
        </Box>
      </Box>
      <JobShow
        applyUrl={isSuccess(applyUrlRes) ? applyUrlRes.value : null}
        isOpen={openJobMatch != null}
        jobRes={openJobRes}
        onClose={() => {
          history.replace("/");
        }}
      />
    </>
  );
}

export default App;
