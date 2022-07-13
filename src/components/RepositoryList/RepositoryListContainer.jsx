import { Component } from 'react'
import { FlatList, View, StyleSheet, Pressable } from 'react-native'
import { Menu, Searchbar } from 'react-native-paper'
import Ionicons from 'react-native-vector-icons/Ionicons'

import RepositoryItem from '../RepositoryItem/RepositoryItem'
import Subheading from '../utils/Subheading'
import theme from '../../theme'

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

export default class RepositoryListContainer extends Component {
  renderHeader = () => {
    const {
      sort,
      sorting,
      setSorting,
      visible,
      setVisible,
      searchKeyword,
      setSearchKeyword,
    } = this.props

    const openMenu = () => setVisible(true)
    const closeMenu = () => setVisible(false)

    return (
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
    )
  }

  render() {
    const { repositories, navigate } = this.props

    const repositoryNodes =
      repositories && repositories.edges
        ? repositories.edges.map(edge => edge.node)
        : []

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
          ListHeaderComponent={this.renderHeader}
        />
      </View>
    )
  }
}
