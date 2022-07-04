import { styled } from 'goober'

export const SpinnerContainer = styled('div')`
  width: fit-content;
  /* TODO: do this like a normal person */
  position: absolute;
  top: 38%;
  left: 38%;

  @keyframes rotating {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  animation: rotating 2s linear infinite;
`

export const OuterCircle = styled('div')`
  width: 5em;
  height: 5em;
  border-radius: 5em;
  background: var(--brand);
  display: flex;
  overflow: hidden;
`

export const InnerCircle = styled('div')`
  width: 4.35em;
  height: 4.35em;
  border-radius: 50%;
  margin: auto;
  background: var(--background);
  /* background: purple; */
`

export const CutSquare = styled('div')`
  width: 2.75em;
  height: 2.75em;
  background: var(--background);
  /* background: blue; */
  position: absolute;
  right: 0;
  bottom: 0;
`