import { useQuery } from '@apollo/client'

import { GET_REPOSITORY } from '../graphql/queries'

const useRepositories = id => {
  const { data, loading, refetch } = useQuery(GET_REPOSITORY, {
    variables: { repositoryId: id },
    fetchPolicy: 'cache-and-network',
  })

  return {
    repository: data ? data.repository : [],
    loading,
    refetch,
  }
}

export default useRepositories
