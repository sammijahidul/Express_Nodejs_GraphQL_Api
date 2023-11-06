import { gql } from "@apollo/client";

const GET_PROJECTS = gql`
  query getProjects {
    projects {
      id,
      name,
      description,
      status
    }
  }

`;

export default GET_PROJECTS;