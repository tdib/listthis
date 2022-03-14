import useIsDarkScheme from './hooks/useIsDarkTheme'
import styled, { ThemeProvider } from 'styled-components'
import styles from './styles'

import ListItems from './components/ListItem/ListItem.js'

const Main = styled.main`
  background: ${p => p.theme.primary};
  color: ${p => p.theme.secondary};
`

const App = () => {
  const isDarkTheme = useIsDarkScheme()

  return (
    <ThemeProvider
      theme={{ ...styles, ...styles[isDarkTheme ? 'dark' : 'light'] }}
    >
      <Main>
        <ListItems />
      </Main>
    </ThemeProvider>
  )
}

export default App
