import { FlatList, View, StyleSheet } from 'react-native'
import { useParams } from 'react-router-native'

import RepositoryItem from '../RepositoryItem/RepositoryItem'
import ReviewItem from './ReviewItem'
import useRepository from '../../hooks/useRepository'

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    paddingTop: 10,
  },
  header: {
    paddingBottom: 10,
  },
  separator: {
    height: 10,
  },
})

const RepositoryViewContainer = ({ repository, reviews, onEndReach }) => {
  const ItemSeparator = () => <View style={styles.separator} />

  if (!repository) {
    return (
      <View style={styles.container}>
        <RepositoryItem />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={reviews}
        renderItem={({ item }) => <ReviewItem item={item} />}
        keyExtractor={({ id }) => id}
        ListHeaderComponent={
          <View style={styles.header}>
            <RepositoryItem item={repository} />
          </View>
        }
        ItemSeparatorComponent={ItemSeparator}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    </View>
  )
}

const RepositoryView = () => {
  const { id } = useParams()
  const { repository, fetchMore } = useRepository(id)

  const reviews =
    repository && repository.reviews && repository.reviews.edges
      ? repository.reviews.edges.map(edge => edge.node)
      : []

  const onEndReach = () => {
    fetchMore()
  }

  return (
    <RepositoryViewContainer
      reviews={reviews}
      repository={repository}
      onEndReach={onEndReach}
    />
  )
}

export default RepositoryView
