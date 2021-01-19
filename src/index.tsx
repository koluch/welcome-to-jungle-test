import { createTheme, WuiProvider } from "@welcome-ui/core";
import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./components/App";

const theme = createTheme({});

render(
  <BrowserRouter>
    <WuiProvider theme={theme} hasGlobalStyle useReset>
      <App />
    </WuiProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
