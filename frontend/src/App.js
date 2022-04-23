import { useCallback, useEffect } from 'react'
import { Routes, Route, useLocation, Navigate, useNavigate } from 'react-router-dom'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'
import styles from './styles'
import debounce from 'lodash.debounce'

import { ListSelectionPage, LoginPage, RegisterPage, ListPage, Page404, InvitePage } from './pages'
import { useListStore, useUserStore } from './stores'
import { TabBar } from './components'
import { updateList } from './services/lists'
import { useIsDarkScheme } from './hooks'

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
