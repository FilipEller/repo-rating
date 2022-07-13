import { gql } from '@apollo/client'

import {
  REPOSITORY_DETAILS,
  REVIEW_CONNECTION_DETAILS,
  PAGE_INFO_DETAILS,
} from './fragments'

export const GET_REPOSITORIES = gql`
  query Repositories(
    $searchKeyword: String
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $first: Int
    $after: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
      first: $first
      after: $after
    ) {
      totalCount
      edges {
        node {
          ...RepositoryDetails
        }
        cursor
      }
      pageInfo {
        ...PageInfoDetails
      }
    }
  }
  ${REPOSITORY_DETAILS}
  ${PAGE_INFO_DETAILS}
`

export const GET_REPOSITORY = gql`
  query Repository($repositoryId: ID!, $first: Int, $after: String) {
    repository(id: $repositoryId) {
      ...RepositoryDetails
      reviews(first: $first, after: $after) {
        ...ReviewConnectionDetails
      }
    }
  }
  ${REPOSITORY_DETAILS}
  ${REVIEW_CONNECTION_DETAILS}
`

export const GET_CURRENT_USER = gql`
  query getCurrentUser($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        ...ReviewConnectionDetails
      }
    }
  }
  ${REVIEW_CONNECTION_DETAILS}
`
