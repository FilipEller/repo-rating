import { View } from 'react-native'
import { Link } from 'react-router-native'
import Text from '../Text'

const AppBar = ({ text, route }) => {
  return (
    <View>
      <Link to={route}>
        <Text>{text}</Text>
      </Link>
    </View>
  )
}

export default AppBar
