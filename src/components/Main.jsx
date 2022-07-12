import { StyleSheet, View, Dimensions } from 'react-native'
import { Route, Routes, Navigate } from 'react-router-native'

import AppBar from './AppBar/AppBar'
import AddReview from './AddReview'
import SignIn from './SignIn'
import SignUp from './SignUp'
import RepositoryView from './RepositoryView'
import theme from '../theme'

import RepositoryList from './RepositoryList'

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.elevation[0],
    width,
    height,
    paddingBottom: 50,
  },
  heading: {
    alignSelf: 'center',
    paddingBottom: 15,
  },
})

const Main = () => {
  return (
    <View>
      <AppBar />
      <View style={styles.container}>
        <Routes>
          <Route path='/' element={<RepositoryList />} exact />
          <Route path='/review' element={<AddReview />} exact />
          <Route path='/signin' element={<SignIn />} exact />
          <Route path='/signup' element={<SignUp />} exact />
          <Route path='/repositories/:id' element={<RepositoryView />} exact />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </View>
    </View>
  )
}

export default Main
