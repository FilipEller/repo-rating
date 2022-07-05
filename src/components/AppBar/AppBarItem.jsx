import { View, StyleSheet } from 'react-native'
import { Link } from 'react-router-native'
import Text from '../utils/Text'
import theme from '../../theme'

const styles = StyleSheet.create({
  item: {
    paddingHorizontal: 7,
  },
  link: {
    paddingHorizontal: 13,
    paddingVertical: 7,
    borderRadius: 15,
  },
})

const backgroundColorPressed = theme.elevation[0]

const AppBar = ({ text, route, onPress }) => {
  return (
    <View style={styles.item}>
      <Link
        to={route}
        style={styles.link}
        underlayColor={backgroundColorPressed}
        onPress={onPress}>
        <Text>{text}</Text>
      </Link>
    </View>
  )
}

export default AppBar
