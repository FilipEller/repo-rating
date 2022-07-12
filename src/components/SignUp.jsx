import { View, StyleSheet } from 'react-native'
import { useNavigate } from 'react-router-native'
import { Formik } from 'formik'
import * as yup from 'yup'
import { useMutation } from '@apollo/client'

import useSignIn from '../hooks/useSignIn'
import { CREATE_USER } from '../graphql/mutations'

import FormikTextInput from './utils/FormikTextInput'
import theme from '../theme'
import Button from './utils/Button'
import Subheading from './utils/Subheading'

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.elevation[1],
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  heading: {
    paddingBottom: 10,
    alignSelf: 'center',
  },
})

export const SignUpContainer = ({ onSubmit }) => {
  const initialValues = {
    username: '',
    password: '',
    passwordConfirm: '',
  }

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .required('Username is required')
      .min(1, 'Username must be at least 1 character')
      .max(30, 'Username must be at most 30 characters'),
    password: yup
      .string()
      .required('Password is required')
      .min(5, 'Password must be at least 5 characters')
      .max(50, 'Password must be at most 50 characters'),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords do not match')
      .required('Password confirmation is required'),
  })

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}>
      {({ handleSubmit }) => (
        <View style={styles.container}>
          <Subheading style={styles.heading} color='primary'>
            Sign up
          </Subheading>
          <FormikTextInput name='username' placeholder='Username' />
          <FormikTextInput name='password' placeholder='Password' />
          <FormikTextInput
            name='passwordConfirmation'
            placeholder='Confirm password'
          />
          <Button onPress={handleSubmit}>Sign up</Button>
        </View>
      )}
    </Formik>
  )
}

const SignUp = () => {
  const [signIn] = useSignIn()
  const navigate = useNavigate()
  const [mutate] = useMutation(CREATE_USER)

  const onSubmit = async values => {
    const { username, password } = values

    try {
      await mutate({ variables: { user: { username, password } } })
      console.log('signed up')
      await signIn({ username, password })
      console.log('signed in')
      navigate('/')
    } catch (e) {
      console.log(e.message)
    }
  }

  return <SignUpContainer onSubmit={onSubmit} />
}

export default SignUp
