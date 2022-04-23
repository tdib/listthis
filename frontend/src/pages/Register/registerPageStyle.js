import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
`

export const Title = styled.h1`
  color: ${p => p.theme.textPrimary};
`

export const RegisterForm = styled.form`
  background-color: ${p => p.theme.secondary};
  width: 18rem;
  height: 30rem;
  height: fit-content;
  border-radius: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
`

export const ErrorWarning = styled.div`
  background: ${p => p.theme.red};
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  color: ${p => p.theme.textPrimary};
`

export const InputField = styled.input`
  border-radius: 0.25rem;
  height: 2rem;
  border: none;
  text-indent: 0.5rem;

  :focus {
    outline: solid;
    outline-color: ${p => p.theme.accentPrimary};
  }

  @media (prefers-color-scheme: light) {
    background-color: ${p => p.theme.primary};
  }
`

export const RegisterButton = styled.input`
  height: 2.5rem;
  background-color: ${p => p.theme.accentPrimary};
  border: none;
  border-radius: 1rem;
  transition: transform 0.1s;
  color: ${p => p.theme.textPrimary};
  width: 100%;

  :hover {
    filter: brightness(1.05);
    transform: scale(0.98);
    cursor: pointer;
  }

  :active {
    transform: scale(1.02);
  }

  @media (prefers-color-scheme: light) {
    color: ${p => p.theme.secondary};
  }
`

export const SupportText = styled.p`
  color: ${p => p.theme.textPrimary};
  margin: 0;
  padding: 0.5rem;
`

export const Link = styled.a`
  color: ${p => p.theme.link};

  :hover {
    cursor: pointer;
  }
`
