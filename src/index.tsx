import { createTheme, WuiProvider } from "@welcome-ui/core";
import React from "react";
import { render } from "react-dom";

import App from "./App";

const theme = createTheme({});

render(
  <WuiProvider theme={theme} hasGlobalStyle useReset>
    <App />
  </WuiProvider>,
  document.getElementById("root")
);
