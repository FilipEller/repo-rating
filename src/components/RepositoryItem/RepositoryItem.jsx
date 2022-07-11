import { View, StyleSheet, Image } from 'react-native'
import * as Linking from 'expo-linking'

import Text from '../utils/Text'
import Subheading from '../Subheading'
import StatBar from './StatBar'
import theme from '../../theme'
import Button from '../utils/Button'

const styles = StyleSheet.create({
  container: {
    borderColor: theme.colors.borderColor,
    backgroundColor: theme.elevation[1],
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginHorizontal: 10,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 10,
    borderColor: theme.colors.debugBorder,
    // borderWidth: 1,
  },
  headerInfo: {
    paddingHorizontal: 20,
    borderColor: theme.colors.debugBorder,
    // borderWidth: 1,
    flexGrow: 1,
  },
  property: {
    paddingBottom: 5,
    flexShrink: 1,
    flex: 1,
    flexWrap: 'wrap',
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 5,
  },
  language: {
    backgroundColor: theme.colors.primary[0],
    padding: 4,
    borderRadius: 3,
    marginVertical: 5,
    paddingHorizontal: 7,
  },
  loading: {
    display: 'flex',
    alignItems: 'center',
  },
})

const RepositoryItem = ({ item }) => {
  if (!item) {
    return (
      <View
        style={{ ...styles.container, ...styles.loading }}
        testID='repositoryItem'>
        <Text>Loading...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container} testID='repositoryItem'>
      <View style={styles.header}>
        <Image source={{ uri: item.ownerAvatarUrl }} style={styles.image} />
        <View style={styles.headerInfo}>
          <Subheading style={styles.property}>{item.fullName}</Subheading>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.property} color='secondary'>
              {item.description}
            </Text>
          </View>
          <Text
            style={[styles.language, { alignSelf: 'flex-start' }]}
            color='dark'>
            {item.language}
          </Text>
        </View>
      </View>
      <StatBar item={item} />
      {item.url && (
        <Button
          text={'Open in Github'}
          onPress={() => Linking.openURL(item.url)}
        />
      )}
    </View>
  )
}

export default RepositoryItem
