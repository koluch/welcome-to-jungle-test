import { screen } from "@testing-library/react";
import { createTheme, WuiProvider } from "@welcome-ui/core";
import { defaultTheme } from "@xstyled/styled-components";
import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";

import Root from "../src/components/Root";
import { success } from "../src/helpers/asyncResource";

import { render } from "./utils";
import MockData from "./data";

const wuiTheme = createTheme({
  screens: defaultTheme.screens,
});

it("can render and show search form and results list", () => {
  // Test first render and componentDidMount
  render(<Root dataRes={success(MockData)} />);

  expect(screen.getByTestId("SearchForm")).toBeTruthy();
  expect(screen.getByTestId("SearchResults")).toBeTruthy();
});
