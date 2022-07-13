import { View, StyleSheet, ScrollView } from 'react-native'
import Constants from 'expo-constants'
import { useQuery } from '@apollo/client'

import theme from '../../theme'
import AppBarItem from './AppBarItem'
import { GET_CURRENT_USER } from '../../graphql/queries'
import useSignOut from '../../hooks/useSignOut'

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    paddingTop: 5,
    paddingBottom: 3,
    backgroundColor: theme.elevation[3],
  },
})

const AppBar = () => {
  const signOut = useSignOut()
  const { data } = useQuery(GET_CURRENT_USER)
  console.log('user data', data)
  const isLoggedIn = data ? Boolean(data.me) : false

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarItem text={'Repositories'} route={'/'} />
        {isLoggedIn ? (
          <>
            <AppBarItem text={'Create a review'} route={'/review'} />
            <AppBarItem
              text={'My reviews'}
              route={'/myreviews'}
            />
            <AppBarItem text={'Sign out'} route={'/'} onPress={signOut} />
          </>
        ) : (
          <>
            <AppBarItem text={'Sign in'} route={'/signin'} />
            <AppBarItem text={'Sign up'} route={'/signup'} />
          </>
        )}
      </ScrollView>
    </View>
  )
}

export default AppBar
