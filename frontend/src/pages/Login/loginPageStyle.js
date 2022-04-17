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

export const LoginForm = styled.form`
  background-color: ${p => p.theme.secondary};
  width: 50%;
  max-width: 30rem;
  min-width: 18rem;
  height: 30rem;
  height: fit-content;
  border-radius: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
`

export const InputField = styled.input`
  border-radius: 0.25rem;
  height: 2rem;
  border: none;

  :focus {
    outline: solid;
    outline-color: ${p => p.theme.accentPrimary};
  }
`
export const LoginButton = styled.input`
  height: 2.5rem;
  background-color: ${p => p.theme.accentPrimary};
  border: none;
  border-radius: 1rem;
  transition: transform 0.1s;
  color: ${p => p.theme.textPrimary};

  :hover {
    filter: brightness(1.05);
    transform: scale(0.98);
    cursor: pointer;
  }

  :active {
    transform: scale(1.02);
  }
`
