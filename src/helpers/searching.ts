import Fuse from "fuse.js";

import { StringLocalization, useStringLocalization } from "../api/helpers";
import { ApiJob } from "../api/types";

import { AsyncResource, map } from "./asyncResource";

export type SearchGroping = "NONE" | "OFFICE" | "DEPARTMENT";

export interface SearchParams {
  text: string;
  jobType: string | null;
  grouping: SearchGroping;
  publishedAfter: Date | null;
}

export const DEFAULT_PARAMS: SearchParams = {
  text: "",
  jobType: null,
  publishedAfter: null,
  grouping: "DEPARTMENT",
};

export interface SearchResultsGroup {
  title: string;
  jobs: WithMatches<ApiJob>[];
}

export type SearchResult =
  | {
      kind: "UNGROUPED";
      jobs: WithMatches<ApiJob>[];
    }
  | {
      kind: "GROUPED";
      groups: SearchResultsGroup[];
    };

function getJobGroup(job: ApiJob, grouping: SearchGroping): string {
  switch (grouping) {
    case "OFFICE":
      return job.office.name;
    case "DEPARTMENT":
      return job.department.name;
  }
  return "No group";
}

const options = {
  includeScore: true,
  includeMatches: true,
  threshold: 0.4,
  keys: [
    {
      name: "name",
      weight: 10,
    },
    {
      name: "office.name",
      weight: 5,
    },
    {
      name: "department.name",
      weight: 2,
    },
    {
      name: "description.safe",
      weight: 1,
    },
  ],
};

export type MatchIndexes = [number, number];

export interface WithMatches<T> {
  item: T;
  matches: {
    [key: string]: MatchIndexes[];
  };
}

function search(
  jobs: ApiJob[],
  params: SearchParams,
  localString: StringLocalization
): WithMatches<ApiJob>[] {
  let result: WithMatches<ApiJob>[];
  if (params.text !== "") {
    const fuse = new Fuse(jobs, options);
    const fuseResults = fuse.search(params.text);
    result = fuseResults.map(({ item, matches }) => {
      const resultMatches: { [key: string]: MatchIndexes[] } = {};
      for (const match of matches || []) {
        if (match.key != null) {
          resultMatches[match.key] = match.indices.map(([x, y]) => [x, y + 1]);
        }
      }
      return {
        item: item,
        matches: resultMatches,
      };
    });
  } else {
    result = jobs.map((job) => ({ item: job, matches: {} }));
  }

  result = result.filter((job) => {
    let include = true;
    if (include && params.jobType != null) {
      include = localString(job.item.contract_type) === params.jobType;
    }
    if (include && params.publishedAfter != null) {
      include = job.item.published_at > params.publishedAfter;
    }
    return include;
  });

  return result;
}

function group(
  jobs: WithMatches<ApiJob>[],
  params: SearchParams
): SearchResultsGroup[] {
  const groups: { [key: string]: SearchResultsGroup } = {};
  for (const job of jobs) {
    const group = getJobGroup(job.item, params.grouping);
    if (groups[group] == null) {
      groups[group] = {
        title: group,
        jobs: [],
      };
    }
    groups[group].jobs.push(job);
  }
  return Object.values(groups);
}

export function useSearchResults(
  jobListRes: AsyncResource<ApiJob[]>,
  params: SearchParams
): AsyncResource<SearchResult> {
  const localString = useStringLocalization();
  return map(jobListRes, (jobList) => {
    const filteredJobs = search(jobList, params, localString);
    if (params.grouping === "NONE") {
      return {
        kind: "UNGROUPED",
        jobs: filteredJobs,
      };
    }
    return {
      kind: "GROUPED",
      groups: group(filteredJobs, params),
    };
  });
}
