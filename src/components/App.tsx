// import { Box } from "@welcome-ui/box";
import { Box } from "@xstyled/styled-components";
import { createGlobalStyle } from "@xstyled/styled-components";
import React from "react";
import { Route, Switch } from "react-router-dom";

import JobList from "./JobList";
import JobShow from "./JobShow";

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

function App(): JSX.Element {
  return (
    <>
      <GlobalStyle />
      <Box
        display="flex"
        width={1}
        flex="1"
        justifyContent="center"
        alignItems="center"
        backgroundColor="nude.100"
      >
        <Switch>
          <Route path="/show/:id">
            <JobShow />
          </Route>
          <Route path="/">
            <JobList />
          </Route>
        </Switch>
      </Box>
    </>
  );
}

export default App;
