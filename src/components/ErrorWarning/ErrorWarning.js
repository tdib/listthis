import { Container } from './errorWarningStyle'

const ErrorWarning = ({ children: error }) => {
  return <Container>
    {error}
  </Container>
}

export default ErrorWarning