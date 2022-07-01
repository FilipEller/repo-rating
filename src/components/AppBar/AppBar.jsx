import { View, StyleSheet } from 'react-native'
import Constants from 'expo-constants'
import theme from '../../theme'
import AppBarItem from './AppBarItem'

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    backgroundColor: theme.elevation[1],
  },
})

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarItem text={'Repositories'} />
      <AppBarItem text={'Account'} />
      <AppBarItem text={'About'} />
    </View>
  )
}

export default AppBar
