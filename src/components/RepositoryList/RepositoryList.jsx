import { useState } from 'react'
import { useNavigate } from 'react-router-native'
import { useDebounce } from 'use-debounce'

import useRepositories from '../../hooks/useRepositories'
import RepositoryListContainer from './RepositoryListContainer'

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

  const { repositories, fetchMore } = useRepositories({
    sorting,
    searchKeyword: debouncedSearch,
  })

  const onEndReach = () => {
    fetchMore()
  }

  return (
    <>
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
        onEndReach={onEndReach}
      />
    </>
  )
}

export default RepositoryList
