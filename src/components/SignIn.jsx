import { View, StyleSheet } from 'react-native'
import { useNavigate } from 'react-router-native'
import { Formik } from 'formik'
import * as yup from 'yup'

import useSignIn from '../hooks/useSignIn'

import FormikTextInput from './utils/FormikTextInput'
import theme from '../theme'
import Button from './utils/Button'

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.elevation[1],
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
})

export const SignInContainer = ({ onSubmit }) => {
  const initialValues = {
    username: '',
    password: '',
  }

  const validationSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
  })

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}>
      {({ handleSubmit }) => (
        <View style={styles.container}>
          <FormikTextInput name='username' placeholder='Username' />
          <FormikTextInput name='password' placeholder='Password' />
          <Button onPress={handleSubmit} text='Sign in' />
        </View>
      )}
    </Formik>
  )
}

const SignIn = () => {
  const [signIn] = useSignIn()
  const navigate = useNavigate()

  const onSubmit = async values => {
    const { username, password } = values

    try {
      const data = await signIn({ username, password })
      navigate('/')
      console.log(data)
    } catch (e) {
      console.log(e)
    }
  }

  return <SignInContainer onSubmit={onSubmit} />
}

export default SignIn
