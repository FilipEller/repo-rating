import { View, StyleSheet } from 'react-native'
import { format } from 'date-fns'

import Text from './utils/Text'
import Subheading from './utils/Subheading'
import theme from '../theme'

const ratingWidth = 42

const styles = StyleSheet.create({
  container: {
    borderColor: theme.colors.borderColor,
    backgroundColor: theme.elevation[1],
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 20,
    marginHorizontal: 10,
    display: 'flex',
    flexDirection: 'row',
  },
  body: {
    paddingHorizontal: 20,
    borderColor: theme.colors.debugBorder,
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
})

const ReviewItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.rating}>
        <Text style={styles.ratingText}>{item.rating}</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.header}>
          <Subheading>{item.user.username}</Subheading>
          <Text>{format(new Date(item.createdAt), 'd.M.yyyy')}</Text>
        </View>
        <Text color='secondary'>{item.text}</Text>
      </View>
    </View>
  )
}

export default ReviewItem
