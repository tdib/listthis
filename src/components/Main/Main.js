import { styled } from 'goober'

const Main = styled('main')`
  padding: 1em;
  display: flex;
  flex: 1;
  flex-direction: column;

  ${p => p.$vCentered && `
    justify-content: center;
  `}
`

export default Main
