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
  jobs: ApiJob[];
}

export type SearchResult =
  | {
      kind: "UNGROUPED";
      jobs: ApiJob[];
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

function search(
  jobs: ApiJob[],
  params: SearchParams,
  localString: StringLocalization
) {
  return jobs.filter((job) => {
    let include = true;
    if (params.text !== "") {
      include =
        job.name.toLowerCase().indexOf(params.text.trim().toLowerCase()) != -1;
    }
    if (include && params.jobType != null) {
      include = localString(job.contract_type) === params.jobType;
    }
    if (include && params.publishedAfter != null) {
      include = job.published_at > params.publishedAfter;
    }
    return include;
  });
}

function group(jobs: ApiJob[], params: SearchParams): SearchResultsGroup[] {
  const groups: { [key: string]: SearchResultsGroup } = {};
  for (const job of jobs) {
    const group = getJobGroup(job, params.grouping);
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
