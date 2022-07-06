import { styled } from 'goober'

const Header = styled('h1')`
  color: var(--text);
  margin: 0;
  word-break: break-word;

  ${p => p.$hCentered && `
    text-align: center;
  `}
`

export default Header