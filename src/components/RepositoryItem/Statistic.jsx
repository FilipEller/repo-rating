import { View, StyleSheet } from 'react-native'
import Text from '../Text'

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
  },
})

const Statistic = ({ name, value }) => {
  const valueToShow = value > 1000 ? `${Math.round(value / 100) / 10}k` : value

  return (
    <View style={styles.container}>
      <Text bold>{valueToShow}</Text>
      <Text color='secondary'>{name}</Text>
    </View>
  )
}

export default Statistic
