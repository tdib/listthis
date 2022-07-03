import { LoginForm, Label, SupportText, Link } from './registerStyle'
import { Main, Button, Header, ErrorWarning } from '/src/components'
import { createUser, usernameExists } from '/src/services'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const { register, handleSubmit } = useForm()
  const [error, setError] = useState()
  const navigate = useNavigate()

  const registerFn = async data => {
    console.log('hi');
    setError()
    const { email, username, password, confirmPassword } = data
    // Passwords unmatched error
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (!usernameExists(username)) {
      setError('This username is already in use')
      return
    }

    try {
      await createUser({ email, username, password })
    } catch (error) {
      if (error.code && error.code == 'auth/email-already-in-use') {
        setError('This email is already in use')
      }
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
        <Label htmlFor='username'>Username</Label>
        <input
          required={true}
          defaultValue={'dib'}
          placeholder='johndoe12'
          {...register('username')}
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
