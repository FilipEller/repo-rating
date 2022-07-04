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
