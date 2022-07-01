import { View, StyleSheet } from 'react-native'
import Statistic from './Statistic'
import theme from '../../theme'

const styles = StyleSheet.create({
  stats: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderColor: theme.colors.debugBorder,
    // borderWidth: 1,
  },
})

const StatBar = ({ item }) => {
  return (
    <View style={styles.stats}>
      <Statistic name='Stars' value={item.stargazersCount} />
      <Statistic name='Forks' value={item.forksCount} />
      <Statistic name='Reviews' value={item.reviewCount} />
      <Statistic name='Rating' value={item.ratingAverage} />
    </View>
  )
}

export default StatBar
