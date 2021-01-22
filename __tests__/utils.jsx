import { render as TestLibraryRender } from "@testing-library/react";
import { createTheme, WuiProvider } from "@welcome-ui/core";
import { defaultTheme } from "@xstyled/styled-components";
import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";

const wuiTheme = createTheme({
  screens: defaultTheme.screens
});

export function render(children, history = createMemoryHistory()) {
  TestLibraryRender(
    <Router history={history}>
      <WuiProvider theme={wuiTheme}>
        <>{children}</>
      </WuiProvider>
    </Router>
  );
}
