import { FlatList, View, StyleSheet } from 'react-native'

import useRepositories from '../hooks/useRepositories'

import RepositoryItem from './RepositoryItem/RepositoryItem'

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
})

const ItemSeparator = () => <View style={styles.separator} />

export const RepositoryListContainer = ({ repositories }) => {
  const repositoryNodes =
    repositories && repositories.edges
      ? repositories.edges.map(edge => edge.node)
      : []

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => {
        return <RepositoryItem item={item} key={item.id} />
      }}
    />
  )
}

const RepositoryList = () => {
  const { repositories } = useRepositories()

  return <RepositoryListContainer repositories={repositories} />
}

export default RepositoryList
