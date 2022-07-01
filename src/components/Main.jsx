import { StyleSheet, View, Dimensions } from 'react-native'
import Subheading from './Subheading'
import AppBar from './AppBar/AppBar'
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
        <RepositoryList />
      </View>
    </View>
  )
}

export default Main
