import { Shadow, WarningPanel, ButtonContainer, WarningContainer } from './popupStyle'

import { Header, InfoMessage } from '/src/components'

const WarningPopup = ({ header, description, buttons }) => {
  return <>
    <WarningContainer>
      <WarningPanel>
        <Header style={{ marginBottom: '.25em'}}>{header}</Header>
        <InfoMessage style={{ textAlign: 'left'}}>{description}</InfoMessage>
        <ButtonContainer>{buttons}</ButtonContainer>
      </WarningPanel>
    </WarningContainer>
  </>
}

export default WarningPopup