import { useParams } from 'react-router-native'

import RepositoryItem from './RepositoryItem/RepositoryItem'
import useRepository from '../hooks/useRepository'

const RepositoryView = () => {
  const { id } = useParams()
  const { repository } = useRepository(id)

  return <RepositoryItem item={repository} />
}

export default RepositoryView
