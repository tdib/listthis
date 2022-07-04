import { styled } from 'goober'

export const StyledButton = styled('button')`
  padding: .5em .75em;
  background: var(--brand);
  border: none;
  border-radius: .4rem;
  /* TODO: lower weight */
  font-weight: bold;
  color: var(--white);

  transition: transform .075s ease;

  &:hover {
    cursor: pointer;
    transform: scale(1.035);
  }

  &:active {
    transform: scale(0.975);
  }
`
