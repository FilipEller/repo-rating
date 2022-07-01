import { View, StyleSheet, ScrollView } from 'react-native'
import Constants from 'expo-constants'
import theme from '../../theme'
import AppBarItem from './AppBarItem'

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 10,
    backgroundColor: theme.elevation[1],
  }
})

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarItem text={'Repositories'} route={'/'} />
        <AppBarItem text={'Sign in'} route={'/signin'} />
        {/* <AppBarItem text={'Profile'} route={'/signin'} />
        <AppBarItem text={'Settings'} route={'/signin'} />
        <AppBarItem text={'About'} route={'/signin'} /> */}
      </ScrollView>
    </View>
  )
}

export default AppBar
