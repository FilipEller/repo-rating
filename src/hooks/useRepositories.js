import { useQuery } from '@apollo/client'

import { GET_REPOSITORIES } from '../graphql/queries'

const useRepositories = ({ searchKeyword, sorting }) => {
  const sortingMethod = (() => {
    switch (sorting) {
      case 'Latest repositories':
        return { orderBy: 'CREATED_AT', orderDirection: 'DESC' }
      case 'Highest rated repositories':
        return { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' }
      case 'Lowest rated repositories':
        return { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' }
      default:
        return { orderBy: 'CREATED_AT', orderDirection: 'ASC' }
    }
  })()

  const variables = { searchKeyword, ...sortingMethod, first: 10 }

  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    variables,
    fetchPolicy: 'cache-and-network',
  })

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage
    if (!canFetchMore) {
      return
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    })
  }

  return {
    repositories: data?.repositories,
    loading,
    fetchMore: handleFetchMore,
    ...result,
  }
}

export default useRepositories
