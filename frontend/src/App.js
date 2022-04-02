import useIsDarkScheme from './hooks/useIsDarkTheme'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'
import styles from './styles'

import Header from './components/Header/Header'
import ListItems from './components/ListItem/ListItem.js'
import TabBar from './components/TabBar/TabBar'
import AddItemPopup from './components/AddItemPopup/AddItemPopup'
import { useState } from 'react'

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
  const [addItemMenuOpen, setAddItemMenuOpen] = useState(false)

  return (
    <ThemeProvider theme={{ ...styles, ...styles[isDarkTheme ? 'dark' : 'light'] }}>
      <GlobalStyle />
      <Main>
        <Header />
        <ListItems />
        <AddItemPopup isOpen={addItemMenuOpen} onClose={() => setAddItemMenuOpen(false)} />
      </Main>
      <TabBar onOpenAddItemMenu={() => setAddItemMenuOpen(true)} />
    </ThemeProvider>
  )
}

export default App
