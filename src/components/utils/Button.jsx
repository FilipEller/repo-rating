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
  error: {
    backgroundColor: theme.colors.error[0],
  },
  errorPressed: {
    backgroundColor: theme.colors.error[1],
  },
})

const Button = ({
  onPress,
  style,
  textStyle,
  pressedStyle,
  error,
  ...props
}) => {
  const buttonStyle = error
    ? [styles.button, styles.error, style]
    : [styles.button, style]
  const labelStyle = [styles.label, textStyle]
  const clickStyle = error
    ? [styles.pressed, styles.errorPressed, pressedStyle]
    : [styles.pressed, pressedStyle]

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [...buttonStyle, pressed && clickStyle]}
      {...props}
      underlayColor='#333'>
      <Text style={labelStyle} color='dark'>
        {props.children}
      </Text>
    </Pressable>
  )
}

export default Button
