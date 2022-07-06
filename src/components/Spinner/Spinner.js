import { styled } from 'goober'

const Spinner = styled('div')`
  --size: 5em;
  @keyframes spin { to { transform: rotate(360deg); } }
  height: var(--size);
  width: var(--size);
  border-radius: var(--size);
  box-sizing: border-box;
  border: calc(var(--size) / 15) solid var(--brand);
  border-block-end: calc(var(--size) / 15) solid transparent;
  animation: spin 1.5s linear infinite;
  position: fixed;
  top: calc(50% - calc(var(--size) / 2));
  left: calc(50% - calc(var(--size) / 2));
`

export default Spinner