import { LoginForm, Label, SupportText, Link, HeaderContainer } from './loginStyle'

import { Main, Button, Header, ErrorWarning, InputField } from '/src/components'
import { useListsStore } from '/src/stores'
import { auth, getAssociatedLists } from '/src/services'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'

const Login = () => {
  const { register, handleSubmit } = useForm()
  const [error, setError] = useState()
  const navigate = useNavigate()
  const { loadLists } = useListsStore()

  const loginFn = async ({ email, password }) => {
    setError()

    signInWithEmailAndPassword(auth, email, password)
      .then(async userCred => {
        const user = userCred.user
        const associatedLists = await getAssociatedLists(user.uid)
        loadLists(associatedLists)
        
        navigate('/lists')
      })
      .catch(error => {
        if (error.code && (error.code == 'auth/wrong-password' || error.code === 'auth/user-not-found')) {
          setError('The credentials you provided were incorrect')
        } else if (error.code) {
          setError(error.code)
        } else {
          setError('An unknown error occurred')
        }
        console.log(error);
      })
  }

  return <Main>
    <HeaderContainer>
      <Header>Login</Header>
    </HeaderContainer>
    <LoginForm onSubmit={handleSubmit(loginFn)}>
      {error && <ErrorWarning>{error}</ErrorWarning>}
      <div>
        <Label htmlFor='email'>Email</Label>
        <InputField
          autoFocus={true}
          required={true}
          id='email'
          defaultValue={'thomas.dib02@gmail.com'}
          placeholder='johndoe@example.com'
          {...register('email')}
        />
      </div>
      <div>
        <Label htmlFor='password'>Password</Label>
        <InputField
          required={true}
          name='password'
          type='password'
          defaultValue={'ffffff'}
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
