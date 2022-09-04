import { Form, Label, SupportText, HeaderContainer, SubmitContainer } from './authStyle'

import { Main, Button, Header, ErrorWarning, InputField } from '/src/components'
import { auth, createUser } from '/src/services'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'

const Register = () => {
  const { register, handleSubmit } = useForm()
  const [error, setError] = useState()
  const navigate = useNavigate()

  const registerFn = async ({ email, displayName, password, confirmPassword }) => {
    setError()
    // Passwords unmatched error
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    try {
      // Create user in firebase authentication & firestore
      const user = await createUser({ email, displayName, password })
      // Load user into zustand store
      loadUser({
        userID: user.uid,
        displayName: user.displayName,
        email: user.email,
        associatedListUIDs: []
      })
    } catch (error) {
      if (error.code && error.code == 'auth/email-already-in-use') {
        setError('This email is already in use')
      } else if (error.code) {
        setError(error.code)
      } else {
        setError('An unknown error occurred')
      }
      return
    }

    navigate('/login')
  }

  return <Main $vCentered $hCentered>
    <HeaderContainer>
      <Header $hCentered>Register</Header>
    </HeaderContainer>
    <Form onSubmit={handleSubmit(registerFn)}>
      {error && <ErrorWarning>{error}</ErrorWarning>}
      <div>
        <Label htmlFor='email'>Email</Label>
        <InputField
          autoFocus={true}
          required={true}
          type='email'
          defaultValue={'test@test.com'}
          placeholder='johndoe@example.com'
          {...register('email')}
        />
      </div>
      <div>
        {/* TODO: question mark that explains what this means */}
        <Label htmlFor='displayName'>Display Name</Label>
        <InputField
          required={true}
          defaultValue={'test'}
          placeholder='johndoe12'
          {...register('displayName')}
        />
      </div>
      <div>
        <Label htmlFor='password'>Password</Label>
        <InputField
          required={true}
          type='password'
          minLength={6}
          defaultValue='testtest'
          {...register('password')}
        />
      </div>
      <div>
        <Label htmlFor='confirm-password'>Confirm password</Label>
        <InputField
          required={true}
          type='password'
          defaultValue='testtest'
          {...register('confirmPassword')}
        />
      </div>
      <SubmitContainer>
        <Button type='submit'>Register</Button>
        <SupportText>
          Already have an account?{' '}
          <Link to='/login'>Log in</Link>
        </SupportText>
      </SubmitContainer>
    </Form>
  </Main>
}

export default Register
