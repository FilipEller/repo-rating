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

  const { data, loading, refetch } = useQuery(GET_REPOSITORIES, {
    variables: { searchKeyword, ...sortingMethod },
    fetchPolicy: 'cache-and-network',
  })

  return {
    repositories: data ? data.repositories : [],
    loading,
    refetch,
  }
}

export default useRepositories
