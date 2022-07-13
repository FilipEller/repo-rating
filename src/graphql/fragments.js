import { gql } from '@apollo/client'

export const REPOSITORY_DETAILS = gql`
  fragment RepositoryDetails on Repository {
    id
    ownerAvatarUrl
    fullName
    language
    description
    stargazersCount
    forksCount
    reviewCount
    ratingAverage
  }
`

export const REVIEW_DETAILS = gql`
  fragment ReviewDetails on Review {
    id
    text
    rating
    createdAt
    user {
      id
      username
    }
    repository {
      fullName
    }
  }
`

export const PAGE_INFO_DETAILS = gql`
  fragment PageInfoDetails on PageInfo {
    startCursor
    endCursor
    hasNextPage
  }
`

export const REVIEW_CONNECTION_DETAILS = gql`
  fragment ReviewConnectionDetails on ReviewConnection {
    totalCount
    pageInfo {
      ...PageInfoDetails
    }
    edges {
      cursor
      node {
        ...ReviewDetails
      }
    }
  }
  ${REVIEW_DETAILS}
  ${PAGE_INFO_DETAILS}
`
