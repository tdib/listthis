import useIsDarkScheme from './hooks/useIsDarkTheme'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'
import styles from './styles'

import Header from './components/Header/Header'
import ListItems from './components/ListItem/ListItem.js'
import TabBar from './components/TabBar/TabBar'

const Main = styled.main`
  // background: ${p => p.theme.primary};
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

  return (
    <ThemeProvider theme={{ ...styles, ...styles[isDarkTheme ? 'dark' : 'light'] }}>
      <GlobalStyle />
      <Main>
        <Header />
        <ListItems />
      </Main>
      <TabBar />
    </ThemeProvider>
  )
}

export default App
