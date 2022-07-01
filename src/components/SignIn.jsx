import { View, StyleSheet } from 'react-native'
import { Formik } from 'formik'

import FormikTextInput from './utils/FormikTextInput'
import theme from '../theme'
import Button from './utils/Button'

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.elevation[1],
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  input: {
    marginBottom: 10,
  },
})

const SignIn = () => {
  const initialValues = {
    username: '',
    password: '',
  }

  const onSubmit = values => {
    console.log(values)
  }

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit }) => (
        <View style={styles.container}>
          <FormikTextInput
            name='username'
            placeholder='Username'
            style={styles.input}
          />
          <FormikTextInput
            name='password'
            placeholder='Password'
            style={styles.input}
          />
          <Button onPress={handleSubmit} text='Sign in' />
        </View>
      )}
    </Formik>
  )
}

export default SignIn
