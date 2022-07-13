import { Component, useState } from 'react'
import { FlatList, View, StyleSheet, Pressable } from 'react-native'
import { useNavigate } from 'react-router-native'
import { Menu, Searchbar } from 'react-native-paper'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useDebounce } from 'use-debounce'

import useRepositories from '../hooks/useRepositories'
import RepositoryItem from './RepositoryItem/RepositoryItem'
import Subheading from './utils/Subheading'
import theme from '../theme'

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container: { marginTop: 10, marginBottom: 5, marginHorizontal: 10 },
  searchBar: {
    backgroundColor: theme.elevation[1],
    color: theme.colors.textPrimary,
    borderColor: theme.colors.borderColor,
    borderWidth: 1,
  },
  anchor: {
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
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

export class RepositoryListContainer extends Component {
  render() {
    const {
      repositories,
      sort,
      sorting,
      setSorting,
      navigate,
      visible,
      setVisible,
      searchKeyword,
      setSearchKeyword,
    } = this.props

    const repositoryNodes =
      repositories && repositories.edges
        ? repositories.edges.map(edge => edge.node)
        : []
    const openMenu = () => setVisible(true)
    const closeMenu = () => setVisible(false)

    return (
      <View style={styles.container}>
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
          ListHeaderComponent={
            <View>
              <Searchbar
                placeholder='Search'
                onChangeText={text => setSearchKeyword(text)}
                value={searchKeyword}
                style={styles.searchBar}
                theme={{ colors: { text: theme.colors.textPrimary } }}
                placeholderTextColor={theme.colors.textPrimary}
              />
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
          }
        />
      </View>
    )
  }
}

const RepositoryList = () => {
  const sort = {
    latest: 'Latest repositories',
    highest: 'Highest rated repositories',
    lowest: 'Lowest rated repositories',
  }

  const [sorting, setSorting] = useState(sort.latest)
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)
  const [searchKeyword, setSearchKeyword] = useState('')
  const [debouncedSearch] = useDebounce(searchKeyword, 500)

  const { repositories } = useRepositories({
    sorting,
    searchKeyword: debouncedSearch,
  })

  return (
    <RepositoryListContainer
      repositories={repositories}
      sort={sort}
      sorting={sorting}
      setSorting={setSorting}
      navigate={navigate}
      visible={visible}
      setVisible={setVisible}
      searchKeyword={searchKeyword}
      setSearchKeyword={setSearchKeyword}
    />
  )
}

export default RepositoryList
