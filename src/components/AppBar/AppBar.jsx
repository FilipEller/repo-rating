import { View, StyleSheet, ScrollView } from 'react-native'
import Constants from 'expo-constants'
import { useQuery } from '@apollo/client'

import theme from '../../theme'
import AppBarItem from './AppBarItem'
import { GET_ACCOUNT } from '../../graphql/queries'
import useSignOut from '../../hooks/useSignOut'

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 3,
    backgroundColor: theme.elevation[3],
  },
})

const AppBar = () => {
  const signOut = useSignOut()
  const { data } = useQuery(GET_ACCOUNT)
  const isLoggedIn = data ? Boolean(data.me) : false

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarItem text={'Repositories'} route={'/'} />
        {isLoggedIn ? (
          <AppBarItem text={'Sign out'} route={'/'} onPress={signOut} />
        ) : (
          <AppBarItem text={'Sign in'} route={'/signin'} />
        )}
      </ScrollView>
    </View>
  )
}

export default AppBar
