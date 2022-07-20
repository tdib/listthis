import { styled } from 'goober'

const Main = styled('div')`
  padding: 1em;
  display: flex;
  flex: 1;
  flex-direction: column;

  ${p => p.$vCentered && `
    justify-content: center;
  `}

  overflow-y: overlay;
`

export default Main
