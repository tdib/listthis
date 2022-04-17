import { useCallback, useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import useIsDarkScheme from './hooks/useIsDarkTheme'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'
import styles from './styles'

import Header from './components/Header/Header'
import ListItems from './components/ListItem/ListItems.js'
// import TabBar from './components/TabBar/TabBar'
import useListStore from './stores/useListStore'
import debounce from 'lodash.debounce'
import { createNewList, createOrUpdateItem, getListByID, getListsByUserID } from './services/items'
import { pruneLists, updateList } from './services/lists'
import ListSelection from './components/ListSelection/ListSelection'
import useUserStore from './stores/useUserStore'
import ListPage from './pages/List/ListPage'

import { ListSelectionPage, LoginPage } from './pages'
// import { ListSelection } from './components'
import { TabBar } from './components'

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
  const { listID, items } = useListStore()

  const { userID } = useUserStore()

  // Update list after a specified interval
  const debouncedUpdateList = useCallback(
    debounce(({ listID, items }) => updateList({ listID, items }), 2000),
    []
  )
  useEffect(() => {
    // Prevent null list from being created by ensuring there are items to update
    if (items) {
      debouncedUpdateList({ listID, items })
    }
  }, [items])

  return (
    <ThemeProvider theme={{ ...styles, ...styles[isDarkTheme ? 'dark' : 'light'] }}>
      <GlobalStyle />
      <Main>
        <BrowserRouter>
          <Routes>
            <Route exact path='/login' element={<LoginPage />} />
            <Route exact path='/lists' element={<ListSelectionPage />} />
            <Route exact path='/lists/:listID' element={<ListPage />} />
          </Routes>
        </BrowserRouter>
        {/* {!items ? (
          <ListSelection />
        ) : (
          <>
            <Header />
            <ListItems />
          </>
        )} */}
      </Main>
      {userID ? <TabBar /> : null}
    </ThemeProvider>
  )
}

export default App
