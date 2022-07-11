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

export const GET_REPOSITORY = gql`
  query Repository($repositoryId: ID!) {
    repository(id: $repositoryId) {
      ...RepositoryDetails
      url
    }
  }
  ${REPOSITORY_DETAILS}
`

export const GET_ACCOUNT = gql`
  {
    me {
      id
      username
    }
  }
`
