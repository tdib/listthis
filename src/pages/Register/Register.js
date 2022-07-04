import { LoginForm, Label, SupportText, Link, HeaderContainer } from './registerStyle'

import { Main, Button, Header, ErrorWarning, InputField } from '/src/components'
import { auth, createUser } from '/src/services'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

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
      console.log(0, auth.currentUser);
      // Create user in firebase authentication & firestore
      const user = await createUser({ email, displayName, password })
      // Load user into zustand store
      loadUser({
        userID: user.uid,
        displayName: user.displayName,
        email: user.email,
        associatedListIDs: []
      })
      console.log(1, auth.currentUser);
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

  return <Main>
    <HeaderContainer>
      <Header>Register</Header>
    </HeaderContainer>
    <LoginForm onSubmit={handleSubmit(registerFn)}>
      {error && <ErrorWarning>{error}</ErrorWarning>}
      <div>
        <Label htmlFor='email'>Email</Label>
        <InputField
          autoFocus={true}
          required={true}
          type='email'
          defaultValue={'thomas.dib02@gmail.com'}
          placeholder='johndoe@example.com'
          {...register('email')}
        />
      </div>
      <div>
        {/* TODO: question mark that explains what this means */}
        <Label htmlFor='displayName'>Display Name</Label>
        <InputField
          required={true}
          defaultValue={'dib'}
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
          defaultValue='ffffff'
          {...register('password')}
        />
      </div>
      <div>
        <Label htmlFor='confirm-password'>Confirm password</Label>
        <InputField
          required={true}
          type='password'
          defaultValue='ffffff'
          {...register('confirmPassword')}
        />
      </div>
        <Button type='submit'>Register</Button>
        <SupportText>
          Already have an account?{' '}
          <Link
            href={'/login'}
            onClick={() => navigate('/login')}
          >
            Log in
          </Link>
        </SupportText>
    </LoginForm>

  </Main>
}

export default Register
