import { styled } from 'goober'

export const LoginForm = styled('form')`
  display: flex;
  flex-direction: column;
  gap: 1.25em;
  padding: 2em 2.5em;
  border-radius: .5em;
  background: var(--surface);
`

export const SupportText = styled('span')`
  display: block;
  /* margin: -0.75em; */
  color: var(--text);
`

export const Link = styled('a')`
  color: var(--link);
`

export const Label = styled('label')`
  display: block;
  text-align: left;
  color: var(--white);
  margin-bottom: .3em;
`

export const HeaderContainer = styled('div')`
  margin: 2em 0em;
`