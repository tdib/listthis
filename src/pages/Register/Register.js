import { LoginForm, Label, SupportText, Link } from './registerStyle'
import { Main, Button, Header, ErrorWarning } from '/src/components'
import { createUser } from '/src/services'
import { useUserStore } from '/src/stores'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { auth } from '/src/services'

const Register = () => {
  const { register, handleSubmit } = useForm()
  const [error, setError] = useState()
  const navigate = useNavigate()
  const { unloadUser, loadUser, userID, displayName: d, email: blah, associatedListIDs } = useUserStore()

  const registerFn = async ({ email, displayName, password, confirmPassword }) => {
    unloadUser()
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
    <Header>Register</Header>
    <LoginForm onSubmit={handleSubmit(registerFn)}>
      {error && <ErrorWarning>{error}</ErrorWarning>}
      <div>
        <Label htmlFor='email'>Email</Label>
        <input
          autoFocus={true}
          required={true}
          type='email'
          defaultValue={'thomas.dib02@gmail.com'}
          placeholder='johndoe@example.com'
          {...register('email')}
        />
      </div>
      <div>
        {/* TODO: quetion mark that explains what this means */}
        <Label htmlFor='displayName'>Display Name</Label>
        <input
          required={true}
          defaultValue={'dib'}
          placeholder='johndoe12'
          {...register('displayName')}
        />
      </div>
      <div>
        <Label htmlFor='password'>Password</Label>
        <input
          required={true}
          type='password'
          minLength={6}
          defaultValue='ffffff'
          {...register('password')}
        />
        <Label htmlFor='confirm-password'>Confirm password</Label>
        <input
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
