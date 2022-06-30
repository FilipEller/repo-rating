import { View, StyleSheet } from 'react-native'
import Text from './Text'
import theme from '../theme'

const styles = StyleSheet.create({
  container: {
    borderColor: theme.colors.borderColor,
    backgroundColor: theme.elevation[1],
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  property: {
    paddingVertical: 5,
  },
})

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.property}>Full name: {item.fullName}</Text>
      <Text style={styles.property}>Description: {item.description}</Text>
      <Text style={styles.property}>Language: {item.language}</Text>
      <Text style={styles.property}>Stars: {item.stargazersCount}</Text>
      <Text style={styles.property}>Forks: {item.forksCount}</Text>
      <Text style={styles.property}>Reviews: {item.reviewCount}</Text>
      <Text style={styles.property}>Rating: {item.ratingAverage}</Text>
    </View>
  )
}

export default RepositoryItem
