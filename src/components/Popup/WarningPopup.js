import { Shadow, WarningPanel, ButtonsContainer, WarningContainer } from './popupStyle'

import { Header, InfoMessage } from '/src/components'

const WarningPopup = ({ header, description, buttons }) => {
  return <>
    <WarningContainer>
      <WarningPanel>
        <Header style={{ marginBottom: '.25em'}}>{header}</Header>
        <InfoMessage style={{ textAlign: 'left'}}>{description}</InfoMessage>
        <ButtonsContainer>{buttons}</ButtonsContainer>
      </WarningPanel>
    </WarningContainer>
  </>
}

export default WarningPopup