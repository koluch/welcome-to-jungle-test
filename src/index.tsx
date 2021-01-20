import { createTheme, WuiProvider } from "@welcome-ui/core";
import { defaultTheme, Preflight } from "@xstyled/styled-components";
import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./components/App";

const wuiTheme = createTheme({
  screens: defaultTheme.screens,
});

render(
  <BrowserRouter>
    <WuiProvider theme={wuiTheme}>
      <>
        <Preflight />
        <App />
      </>
    </WuiProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
