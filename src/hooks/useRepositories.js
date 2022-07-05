import { useQuery } from '@apollo/client'

import { GET_REPOSITORIES } from '../graphql/queries'

const useRepositories = () => {
  const { data, loading, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  })

  console.log('DATA', data)

  return {
    repositories: data ? data.repositories : [],
    loading,
    refetch,
  }
}

export default useRepositories