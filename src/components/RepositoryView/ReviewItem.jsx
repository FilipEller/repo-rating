import { View, StyleSheet } from 'react-native'

import { format } from 'date-fns'

import Text from '../utils/Text'
import Subheading from '../utils/Subheading'
import Button from '../utils/Button'
import theme from '../../theme'

const ratingWidth = 42

const styles = StyleSheet.create({
  container: {
    borderColor: theme.colors.borderColor,
    backgroundColor: theme.elevation[1],
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 18,
    paddingVertical: 15,
  },
  main: {
    display: 'flex',
    flexDirection: 'row',
  },
  body: {
    paddingLeft: 20,
    flexGrow: 1,
  },
  header: {
    paddingBottom: 5,
  },
  rating: {
    width: ratingWidth,
    height: ratingWidth,
    borderWidth: 1.5,
    borderRadius: ratingWidth / 2,
    borderColor: theme.colors.primary[0],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingText: {
    color: theme.colors.primary[0],
  },
  descriptionContainer: { flexGrow: 1, flexDirection: 'row' },
  description: {
    flex: 1,
    width: 1,
    flexWrap: 'wrap',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 15,
  },
  button: {
    flexGrow: 1,
  },
  buttonGutter: {
    width: 10,
  },
})

const ReviewItem = ({ item, showActions, viewRepository, deleteReview }) => {
  if (!item || !Object.keys(item).length) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <View style={styles.rating}>
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
        <View style={styles.body}>
          <View style={styles.header}>
            <Subheading>
              {showActions ? item.repository?.fullName : item.user.username}
            </Subheading>
            <Text>{format(new Date(item.createdAt), 'd.M.yyyy')}</Text>
          </View>
          <View style={styles.descriptionContainer}>
            <Text color='secondary' style={styles.description}>
              {item.text}
            </Text>
          </View>
        </View>
      </View>
      {showActions && (
        <View style={styles.buttonContainer}>
          <Button
            style={styles.button}
            onPress={() => viewRepository(item.repository.id)}>
            View repository
          </Button>
          <View style={styles.buttonGutter}></View>
          <Button
            style={styles.button}
            onPress={() => deleteReview(item.id)}
            error>
            Delete review
          </Button>
        </View>
      )}
    </View>
  )
}

export default ReviewItem
