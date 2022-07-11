import { FlatList, View, StyleSheet } from 'react-native'
import { useParams } from 'react-router-native'

import RepositoryItem from './RepositoryItem/RepositoryItem'
import ReviewItem from './ReviewItem'
import useRepository from '../hooks/useRepository'

const styles = StyleSheet.create({
  header: {
    paddingBottom: 10,
  },
  separator: {
    height: 10,
  },
})

const RepositoryView = () => {
  const { id } = useParams()
  const { repository } = useRepository(id)

  if (!repository) {
    return <RepositoryItem />
  }

  const reviewNodes =
    repository && repository.reviews && repository.reviews.edges
      ? repository.reviews.edges.map(edge => edge.node)
      : []

  const ItemSeparator = () => <View style={styles.separator} />

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem item={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
        <View style={styles.header}>
          <RepositoryItem item={repository} />
        </View>
      )}
      ItemSeparatorComponent={ItemSeparator}
    />
  )
}

export default RepositoryView
