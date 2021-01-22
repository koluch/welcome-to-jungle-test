import { Alert } from "@welcome-ui/alert";
import { Box } from "@welcome-ui/box";
import { Text } from "@welcome-ui/text";
import React from "react";

import { ApiJob } from "../api/types";
import { AsyncResource, match } from "../helpers/asyncResource";
import {
  SearchResult,
  SearchResultsGroup,
  WithMatches,
} from "../helpers/searching";

import JobListItem from "./JobListItem";

interface Props {
  searchResultsRes: AsyncResource<SearchResult>;
}

export default function SearchResults(props: Props): JSX.Element {
  const { searchResultsRes } = props;
  return match(searchResultsRes, {
    init: () => <></>,
    loading: () => (
      <Text variant="h5" data-testid="SearchResults__loading">
        Loading list of available offers...
      </Text>
    ),
    success: (searchResults) => (
      <Box data-testid="SearchResults">
        {searchResults.kind === "UNGROUPED" && (
          <>
            {searchResults.jobs.length === 0 && (
              <Text variant="h5">
                No jobs found :( Try to change search parameters
              </Text>
            )}
            <List jobs={searchResults.jobs} />
          </>
        )}
        {searchResults.kind === "GROUPED" && (
          <>
            {searchResults.groups.length === 0 && (
              <Text variant="h5">
                No jobs found :( Try to change search parameters
              </Text>
            )}
            {searchResults.groups.map((group) => (
              <Group key={group.title} group={group} />
            ))}
          </>
        )}
      </Box>
    ),
    failed: (message) => (
      <Alert data-testid="SearchResults__failed">
        <Alert.Title>Unable to load list of available offers</Alert.Title>
        <span data-testid="SearchResults__failedMessage">{message}</span>
      </Alert>
    ),
  });
}

function Group(props: { group: SearchResultsGroup }) {
  const { group } = props;
  return (
    <>
      <Text variant="h4" marginTop={32} marginBottom={24} textAlign="center">
        {group.title}
      </Text>
      <List jobs={group.jobs} />
    </>
  );
}

function List(props: { jobs: WithMatches<ApiJob>[] }) {
  const { jobs } = props;
  return (
    <Box spaceY={8} data-testid="SearchResults__list">
      {jobs.map((job) => (
        <JobListItem key={job.item.id} job={job} />
      ))}
    </Box>
  );
}
