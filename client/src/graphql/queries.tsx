import {
  gql
} from "@apollo/client";
export const GET_PROJECTS = gql`
  query GetProjects(
     $company: String!
     $nextToken: String
     $limit: Int
  ) {
    getProjects(company: $company, nextToken: $nextToken, limit: $limit) {
      nextToken
      items {
        id
        project_name
        company
        created_date
        total_jobs
      }
    }
  }
`;

export const GET_PROJECTS_BY_NAME = gql`
  query GetProjectsByName(
     $project_name: String!
  ) {
    getProjectsByName(project_name: $project_name) {
      id
      project_name
      company
      created_date
      total_jobs
    }
  }
`;

export const GET_JOBS_BY_PROJECT = gql`
  query GetJobsByProject(
     $company: String!
     $project_id: String!
     $nextToken: String
     $limit: Int
  ) {
    getJobsByProject(company: $company, project_id: $project_id, nextToken: $nextToken, limit: $limit) {
        nextToken
        items{
          id
          job_name 
          project_id 
          company
          last_time_job_completed
          last_time_job_completed_successfully
          total_successes
          total_failures
          jobs_currently_running
          average_job_length_in_seconds
          total_jobs
          created_date
        }
    }
  }
`;

export const GET_JOBS = gql`
  query GetJobs(
     $company: String!
     $nextToken: String
     $limit: Int
  ) {
    getJobs(company: $company, nextToken: $nextToken, limit: $limit) {
        nextToken
        items {
          id
          job_name 
          project_id 
          company
          last_time_job_completed
          last_time_job_completed_successfully
          total_successes
          total_failures
          jobs_currently_running
          average_job_length_in_seconds
          total_jobs
          created_date
        }
    }
  }
`;

export const GET_JOB_RUNS = gql`
  query GetJobRuns(
     $job_id: String!
     $nextToken: String
     $limit: Int
  ) {
    getJobRuns(job_id: $job_id, nextToken: $nextToken, limit: $limit) {
        nextToken
        items {
          id
          job_id
          start_time
          end_time
          job_status
        }
    }
  }
`;

export const GET_LAST_N_JOB_RUNS = gql`
  query GetLastNJobRuns(
     $job_id: String!
     $n: Int
  ) {
    getLastNJobRuns(job_id: $job_id, n: $n) {
        id
        job_id
        start_time
        end_time
        job_status
    }
  }
`;