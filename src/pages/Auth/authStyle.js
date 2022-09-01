import { styled } from 'goober'

export const Form = styled('form')`
  display: flex;
  flex-direction: column;
  gap: 1.25em;
  padding: 2em 2.5em;
  border-radius: .5em;
  background: var(--surface);
  margin-bottom: 6em;
  max-width: 25em;
`

export const SubmitContainer = styled('div')`
  display: flex;
  flex-direction: column;
`

export const SupportText = styled('span')`
  display: block;
  color: var(--text);
  text-align: center;
  margin-top: .4em;
`

export const Label = styled('label')`
  display: block;
  text-align: left;
  color: var(--text);
  margin-bottom: .3em;
`

export const HeaderContainer = styled('div')`
  margin: 1em 0em;
`