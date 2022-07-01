import { StyleSheet, View, Dimensions } from 'react-native'
import { Route, Routes, Navigate } from 'react-router-native'

import Subheading from './Subheading'
import AppBar from './AppBar/AppBar'
import SignIn from './SignIn'
import theme from '../theme'

import RepositoryList from './RepositoryList'

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    paddingHorizontal: 10,
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.elevation[0],
    width,
    height,
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
        <Subheading color='primary' style={styles.heading}>
          Rate Repository Application
        </Subheading>
        <Routes>
          <Route path='/' element={<RepositoryList />} exact />
          <Route path='/signin' element={<SignIn />} exact />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </View>
    </View>
  )
}

export default Main
