import { FlatList, View, StyleSheet, Alert } from 'react-native'
import { useQuery, useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-native'

import ReviewItem from './RepositoryView/ReviewItem'
import Subheading from './utils/Subheading'
import { GET_CURRENT_USER } from '../graphql/queries'
import { DELETE_REVIEW } from '../graphql/mutations'

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    paddingTop: 10,
  },
  heading: {
    paddingBottom: 10,
    alignSelf: 'center',
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

  const confirmDelete = id => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [{ text: 'Cancel' }, { text: 'Delete', onPress: () => deleteReview(id) }]
    )
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
            deleteReview={confirmDelete}
            showActions
          />
        )}
        keyExtractor={({ id }) => id}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={
          <Subheading style={styles.heading} color='primary'>
            My reviews
          </Subheading>
        }
      />
    </View>
  )
}

export default MyReviews
