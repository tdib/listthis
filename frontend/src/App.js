import { useCallback, useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation, Navigate, useNavigate } from 'react-router-dom'

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

import { ListSelectionPage, LoginPage, RegisterPage, Page404, InvitePage } from './pages'
// import { ListSelection } from './components'
import { TabBar } from './components'
// import Page404 from './pages/404/404Page'

const Main = styled.main`
  color: ${p => p.theme.secondary};
  padding: 2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
`

const GlobalStyle = createGlobalStyle`
  body {
    background: ${p => p.theme.primary};
  }

  *::-webkit-scrollbar {
    width: .5rem;
    height: .5rem;
  }

  *::-webkit-scrollbar-track {
    background: ${p => p.theme.secondary};
  }

  *::-webkit-scrollbar-thumb {
    border-radius: 100px;
    border: 4px solid ${p => p.theme.tertiary};
    width: 12px;
  }

  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
`

const App = () => {
  const isDarkTheme = useIsDarkScheme()
  const { listID, items } = useListStore()
  const { pathname } = useLocation()
  const navigate = useNavigate()

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
        <Routes>
          <Route exact path='/' element={<Navigate replace to='/login' />} />
          <Route exact path='/login' element={<LoginPage />} />
          <Route exact path='/register' element={<RegisterPage />} />
          <Route exact path='/lists' element={<ListSelectionPage />} />
          <Route exact path='/lists/:listID' element={<ListPage />} />
          <Route exact path='/invite/join/:inviteID' element={<InvitePage />} />
          <Route path='*' element={<Page404 />} />
        </Routes>
      </Main>
      {pathname.startsWith('/lists') ? <TabBar /> : null}
    </ThemeProvider>
  )
}

export default App
