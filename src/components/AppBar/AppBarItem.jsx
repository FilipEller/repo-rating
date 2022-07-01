import { View, StyleSheet } from 'react-native'
import { Link } from 'react-router-native'
import Text from '../utils/Text'

const styles = StyleSheet.create({
  item: {
    paddingHorizontal: 20,
  },
})

const AppBar = ({ text, route }) => {
  return (
    <View style={styles.item}>
      <Link to={route}>
        <Text>{text}</Text>
      </Link>
    </View>
  )
}

export default AppBar
