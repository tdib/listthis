import { Shadow, WarningPanel, ButtonContainer } from './popupStyle'

import { Header, InfoMessage } from '/src/components'


const WarningPopup = ({ header, description, buttons }) => {
  return <>
    <Shadow />
    <WarningPanel>
      <Header style={{ marginBottom: '.25em'}}>{header}</Header>
      <InfoMessage style={{ textAlign: 'left'}}>{description}</InfoMessage>
      <ButtonContainer>{buttons}</ButtonContainer>
    </WarningPanel>
  </>
}

export default WarningPopup