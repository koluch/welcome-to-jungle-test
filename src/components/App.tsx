// import { Box } from "@welcome-ui/box";
import { Box, createGlobalStyle } from "@xstyled/styled-components";
import React from "react";

import JobList from "./JobList";

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
        <JobList />
      </Box>
    </>
  );
}

export default App;
