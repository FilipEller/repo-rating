import { useState } from 'react'
import { FlatList, View, StyleSheet, Pressable } from 'react-native'
import { useNavigate } from 'react-router-native'
import { Menu } from 'react-native-paper'
import Ionicons from 'react-native-vector-icons/Ionicons'

import useRepositories from '../hooks/useRepositories'
import RepositoryItem from './RepositoryItem/RepositoryItem'
import Subheading from './utils/Subheading'
import theme from '../theme'

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container: { marginBottom: 50 },
  anchor: {
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginHorizontal: 10,
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  menuContainer: {
    alignSelf: 'center',
  },
  menu: {
    marginTop: 35,
  },
  menuIcon: {
    paddingTop: 6,
    paddingLeft: 3,
  },
  menuItem: {
    backgroundColor: theme.elevation[2],
  },
})

const ItemSeparator = () => <View style={styles.separator} />

export const RepositoryListContainer = ({
  repositories,
  sort,
  sorting,
  setSorting,
}) => {
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)

  const repositoryNodes =
    repositories && repositories.edges
      ? repositories.edges.map(edge => edge.node)
      : []
  const openMenu = () => setVisible(true)
  const closeMenu = () => setVisible(false)

  return (
    <View style={styles.container}>
      <View style={styles.menuContainer}>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          style={styles.menu}
          contentStyle={styles.menuItem}
          anchor={
            <Pressable onPress={openMenu} style={styles.anchor}>
              <Subheading color='primary'>{sorting}</Subheading>
              <Ionicons
                name={'caret-down-outline'}
                size={13}
                color={theme.colors.primary[0]}
                style={styles.menuIcon}
              />
            </Pressable>
          }>
          {Object.keys(sort).map(key => (
            <Menu.Item
              key={key}
              onPress={() => {
                setVisible(false)
                setSorting(sort[key])
              }}
              title={sort[key]}
              theme={{ colors: { text: theme.colors.textPrimary } }}
            />
          ))}
        </Menu>
      </View>
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => {
          return (
            <Pressable onPress={() => navigate(`/repositories/${item.id}`)}>
              <RepositoryItem item={item} key={item.id} />
            </Pressable>
          )
        }}
      />
    </View>
  )
}

const RepositoryList = () => {
  const sort = {
    latest: 'Latest repositories',
    highest: 'Highest rated repositories',
    lowest: 'Lowest rated repositories',
  }

  const [sorting, setSorting] = useState(sort.latest)

  const { repositories } = useRepositories({ sorting })

  return (
    <RepositoryListContainer
      repositories={repositories}
      sort={sort}
      sorting={sorting}
      setSorting={setSorting}
    />
  )
}

export default RepositoryList
