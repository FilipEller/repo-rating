import { gql } from '@apollo/client'

import { REPOSITORY_DETAILS } from './fragments'

export const GET_REPOSITORIES = gql`
  query Repositories {
    repositories {
      totalCount
      edges {
        node {
          ...RepositoryDetails
        }
      }
    }
  }
  ${REPOSITORY_DETAILS}
`