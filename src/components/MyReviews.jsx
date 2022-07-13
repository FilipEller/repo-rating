import { FlatList, View, StyleSheet } from 'react-native'
import { useQuery, useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-native'

import ReviewItem from './RepositoryView/ReviewItem'
import { GET_CURRENT_USER } from '../graphql/queries'
import { DELETE_REVIEW } from '../graphql/mutations'

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

  const navigate = useNavigate()
  const [mutate] = useMutation(DELETE_REVIEW)

  const { data, refetch } = useQuery(GET_CURRENT_USER, {
    variables: { includeReviews: true },
    fetchPolicy: 'cache-and-network',
  })

  const viewRepository = id => {
    navigate(`/repositories/${id}`)
  }

  const deleteReview = id => {
    mutate({ variables: { id } })
    refetch()
  }

  const reviews = data?.me.reviews.edges.map(edge => edge.node)

  return (
    <View style={styles.container}>
      <FlatList
        data={reviews}
        renderItem={({ item }) => (
          <ReviewItem
            item={item}
            viewRepository={viewRepository}
            deleteReview={deleteReview}
            showActions
          />
        )}
        keyExtractor={({ id }) => id}
        ItemSeparatorComponent={ItemSeparator}
      />
    </View>
  )
}

export default MyReviews
