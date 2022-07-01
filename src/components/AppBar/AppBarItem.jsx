import { Pressable } from 'react-native'
import Text from '../Text'

const AppBar = ({ text }) => {
  return (
    <Pressable>
      <Text bold>{text}</Text>
    </Pressable>
  )
}

export default AppBar
