import { Container, ModalPanel, ButtonsContainer } from './popupStyle'

import { Header, InfoMessage } from '/src/components'

const Modal = ({ header, description, buttons }) => {
  return <Container>
    <ModalPanel>
      <Header style={{ marginBottom: '.25em'}}>{header}</Header>
      <InfoMessage style={{ textAlign: 'left'}}>{description}</InfoMessage>
      <ButtonsContainer>{buttons}</ButtonsContainer>
    </ModalPanel>
  </Container>
}

export default Modal