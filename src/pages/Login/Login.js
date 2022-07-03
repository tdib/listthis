import { LoginForm, Label, SupportText, Link } from './loginStyle'
import { Main, Button, Header, ErrorWarning } from '/src/components'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../config/firebase'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const { register, handleSubmit } = useForm()
  const [error, setError] = useState()
  const navigate = useNavigate()

  const loginFn = ({ email, password }) => {
    console.log(email, password);
    setError()
    signInWithEmailAndPassword(auth, email, password)
      .then(userCred => {
        const user = userCred.user
        console.log(user)
        // TODO: set current user to this
        navigate('/lists')
      })
      .catch(error => {
        if (error.code && (error.code == 'auth/wrong-password' || error.code === 'auth/user-not-found')) {
          setError('The credentials you provided were incorrect')
        }
        console.log(error);
      })

    
    
  }

  return <Main>
    <Header>Login</Header>
    <LoginForm onSubmit={handleSubmit(loginFn)}>
      {error && <ErrorWarning>{error}</ErrorWarning>}
      <div>
        <Label htmlFor='email'>Email</Label>
        <input
          autoFocus={true}
          required={true}
          id='email'
          placeholder='johndoe@example.com'
          {...register('email')}
        />
      </div>
      <div>
        <Label htmlFor='password'>Password</Label>
        <input
          required={true}
          name='password'
          type='password'
          {...register('password')}
        />
      </div>
        <Button type='submit'>Log in</Button>
        <SupportText>
          Don't have an account?{' '}
          <Link
            href={'/register'}
            onClick={() => navigate('/register')}
          >
            Register here!
          </Link>
        </SupportText>
    </LoginForm>

  </Main>
}

export default Login
