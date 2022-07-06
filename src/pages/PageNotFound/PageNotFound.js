import { Container, Link, SupportText } from './pageNotFoundStyle'

import { Main, Header, Button } from "/src/components"

import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return <Main $vCentered>
    <Container>
      <Header $hCentered>Error 404</Header>
      <SupportText>This page does not exist. Have a cat gif instead.</SupportText>
      <img src={'https://cataas.com/cat/gif'} />
      <Button style={{
        alignSelf: 'center',
      }} as={Link} to='/'>Return to safety</Button>
    </Container>
  </Main>
}

export default PageNotFound