import { Box } from "@welcome-ui/box";
import { Text } from "@welcome-ui/text";
import { createGlobalStyle } from "@xstyled/styled-components";
import React, { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";

import { fetchData } from "../api";
import { ApiData } from "../api/types";
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
  const jobRouteMatch = useRouteMatch<{ id: string }>("/show/:id");
  const jobOpen =
    (jobRouteMatch != null &&
      isSuccess(dataRes) &&
      jobRouteMatch.params.id != null &&
      dataRes.value.jobs.find(
        ({ id }) => id === parseInt(jobRouteMatch.params.id)
      )) ||
    null;

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
        job={jobOpen}
        onClose={() => {
          history.replace("/");
        }}
      />
    </>
  );
}

export default App;
