import useIsDarkScheme from './hooks/useIsDarkTheme'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'
import styles from './styles'

import Header from './components/Header/Header'
import ListItems from './components/ListItem/ListItems.js'
import TabBar from './components/TabBar/TabBar'
import { useCallback, useEffect, useMemo } from 'react'
import useListStore from './stores/useListStore'
import debounce from 'lodash.debounce'
import { createNewList, createOrUpdateItem, getListByID, getListsByUserID, updateList } from './services/items'
import ListSelection from './components/ListSelection/ListSelection'
import useUserStore from './stores/useUserStore'

const Main = styled.main`
  color: ${p => p.theme.secondary};
  padding: 2rem;
`

const GlobalStyle = createGlobalStyle`
  body {
    background: ${p => p.theme.primary}
  }
`

const App = () => {
  const isDarkTheme = useIsDarkScheme()
  const items = useListStore(s => s.items)

  // TODO: implement logging in
  const loadUser = useUserStore(s => s.loadUser)
  loadUser({
    userID: 'thisisauserid',
    username: 'Dib',
    associatedListIDs: ['list1id', 'list2id', 'list3id'],
    firstName: 'Thomas',
    lastName: 'Dib',
  })

  // TODO: investigate why this is happening 4 times
  // createNewList({ id, name })
  // createOrUpdateItem({ listID: id, itemFields: testItem }) // HEREEEEEE
  // const blah = getListByID(id)
  // console.log('BLAH', blah)

  // const debouncedUpdateList = useCallback(
  //   debounce(({ id, name, items }) => updateList({ id, name, items }), 2000),
  //   []
  // )
  // useEffect(() => {
  //   // console.log('fdlkasjflkjsdlkfjasldk')
  //   // updateList({ items })
  //   // debouncedUpdateList({ id, name, items })
  // }, [items])

  return (
    <ThemeProvider theme={{ ...styles, ...styles[isDarkTheme ? 'dark' : 'light'] }}>
      <GlobalStyle />
      <Main>
        {!items ? (
          <ListSelection />
        ) : (
          <>
            <Header />
            <ListItems />
          </>
        )}
      </Main>
      <TabBar />
    </ThemeProvider>
  )
}

export default App
