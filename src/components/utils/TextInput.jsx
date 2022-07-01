import { TextInput as NativeTextInput, StyleSheet } from 'react-native'
import theme from '../../theme'

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: theme.colors.borderColor,
    borderRadius: 4,
    color: theme.colors.textPrimary,
    padding: 10,
  },
  error: {
    borderColor: theme.colors.error,
  },
})

const TextInput = ({ style, error, errorStyle, ...props }) => {
  const textInputStyle = error
    ? [styles.input, style, styles.error, errorStyle]
    : [styles.input, style]

  return (
    <NativeTextInput
      style={textInputStyle}
      placeholderTextColor={theme.colors.textSecondary}
      {...props}
    />
  )
}

export default TextInput
