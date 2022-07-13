import { FlatList, View, StyleSheet } from 'react-native'
import { useQuery } from '@apollo/client'

import ReviewItem from './RepositoryView/ReviewItem'
import { GET_CURRENT_USER } from '../graphql/queries'

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

const MyReviews = () => {
  const ItemSeparator = () => <View style={styles.separator} />

  const { data } = useQuery(GET_CURRENT_USER, {
    variables: { includeReviews: true },
    fetchPolicy: 'cache-and-network',
  })

  const reviews = data?.me.reviews.edges.map(edge => edge.node)

  return (
    <View style={styles.container}>
      <FlatList
        data={reviews}
        renderItem={({ item }) => <ReviewItem item={item} showRepoName />}
        keyExtractor={({ id }) => id}
        ItemSeparatorComponent={ItemSeparator}
      />
    </View>
  )
}

export default MyReviews
