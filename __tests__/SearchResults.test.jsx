import { screen } from "@testing-library/react";
import { createTheme, WuiProvider } from "@welcome-ui/core";
import { defaultTheme } from "@xstyled/styled-components";
import React from "react";

import SearchResults from "../src/components/SearchResults";
import * as ar from "../src/helpers/asyncResource";
import { render } from "./utils";
import { techJobs } from "./data";

it("renders loading state when passing data in loading state", () => {
  render(<SearchResults searchResultsRes={ar.loading()} />);

  expect(screen.getByTestId("SearchResults__loading").textContent).toEqual(
    "Loading list of available offers..."
  );
});

it("renders job list when passing ungrouped data", () => {
  render(
    <SearchResults
      searchResultsRes={ar.success({
        kind: "UNGROUPED",
        jobs: techJobs.map((job) => ({
          item: job,
          matches: {},
        })),
      })}
    />
  );

  expect(screen.getByTestId("SearchResults")).toBeTruthy();
  expect(screen.getByTestId("SearchResults__list")).toBeTruthy();
  expect(screen.getAllByTestId("JobListItem")).toHaveLength(techJobs.length);
});

it("renders failed state when passing data in failed state", () => {
  const errorMessage = "Some text message";
  render(<SearchResults searchResultsRes={ar.failed(errorMessage)} />);

  expect(screen.getByTestId("SearchResults__failed")).toBeTruthy();
  expect(
    screen.getByTestId("SearchResults__failedMessage").textContent
  ).toEqual(errorMessage);
});
