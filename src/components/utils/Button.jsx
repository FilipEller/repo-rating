import { StyleSheet, Pressable } from 'react-native'
import Text from '../utils/Text'
import theme from '../../theme'

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary[0],
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 4,
  },
  pressed: {
    backgroundColor: theme.colors.primary[1],
  },
  label: {
    alignSelf: 'center',
  },
})

const Button = ({ onPress, text, style, textStyle, ...props }) => {
  const buttonStyle = [styles.button, style]
  const labelStyle = [styles.label, textStyle]

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [...buttonStyle, pressed && styles.pressed]}
      {...props}
      underlayColor='#333'>
      <Text style={labelStyle} color='dark'>
        {text}
      </Text>
    </Pressable>
  )
}

export default Button
