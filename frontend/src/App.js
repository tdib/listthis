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
  const id = 'test-id-list'
  const name = 'first list'
  const testItem = {
    id: crypto.randomUUID(),
    name: 'random name',
    note: 'random note',
    imageURL: null,
    isChecked: false,
    dateAdded: new Date().toISOString(),
    authorID: 'dibbey',
  }

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
