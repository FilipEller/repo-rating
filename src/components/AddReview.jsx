import { View, StyleSheet } from 'react-native'
import { useNavigate } from 'react-router-native'
import { useMutation } from '@apollo/client'
import { Formik } from 'formik'
import * as yup from 'yup'

import FormikTextInput from './utils/FormikTextInput'
import theme from '../theme'
import Button from './utils/Button'
import { CREATE_REVIEW } from '../graphql/mutations'

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.elevation[1],
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
})

export const AddReviewContainer = ({ onSubmit }) => {
  const initialValues = {
    repositoryName: '',
    ownerName: '',
    rating: '',
    text: '',
  }

  const validationSchema = yup.object().shape({
    ownerName: yup.string().required('Repository owner name is required'),
    repositoryName: yup.string().required('Repository name is required'),
    rating: yup
      .number()
      .required('Rating is required')
      .typeError('Rating must be a number')
      .integer('Rating must be an integer')
      .min(0, 'Rating must be greater than or equal to 0')
      .max(100, 'Rating must be less than or equal to 100'),
  })

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}>
      {({ handleSubmit }) => (
        <View style={styles.container}>
          <FormikTextInput
            name='ownerName'
            placeholder='Repository owner name'
          />
          <FormikTextInput
            name='repositoryName'
            placeholder='Repository name'
          />
          <FormikTextInput
            name='rating'
            placeholder='Rating between 0 and 100'
          />
          <FormikTextInput multiline name='text' placeholder='Review' />
          <Button onPress={handleSubmit} text='Create a review' />
        </View>
      )}
    </Formik>
  )
}

const AddReview = () => {
  const navigate = useNavigate()
  const [mutate] = useMutation(CREATE_REVIEW)

  const onSubmit = async values => {
    const { repositoryName, ownerName, rating, text } = values

    try {
      const { data } = await mutate({
        variables: {
          review: {
            repositoryName,
            ownerName,
            rating: isNaN(parseInt(rating)) ? 0 : parseInt(rating),
            text,
          },
        },
      })
      navigate(`/repositories/${data.createReview.repositoryId}`)
    } catch (e) {
      console.log(e.message)
    }
  }

  return <AddReviewContainer onSubmit={onSubmit} />
}
export default AddReview
