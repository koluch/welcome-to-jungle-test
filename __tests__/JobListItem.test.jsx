import { fireEvent, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";

import JobListItem from "../src/components/JobListItem";

import { render } from "./utils";
import MockData from "./data.js";

it("can render and show job title", () => {
  const job = MockData.jobs[0];

  // Test first render and componentDidMount
  render(
    <JobListItem
      job={{
        item: job,
        matches: {},
      }}
    />
  );

  expect(screen.getByTestId("title").textContent).toEqual(job.name);
});

it("can render and navigate to single job route", () => {
  const history = createMemoryHistory();

  const job = MockData.jobs[0];

  // Test first render and componentDidMount
  render(
    <JobListItem
      job={{
        item: job,
        matches: {},
      }}
    />,
    history
  );

  fireEvent.click(screen.getByTestId("see-more-button"));
  expect(history.location.pathname).toBe(`/show/${job.id}`);
});
