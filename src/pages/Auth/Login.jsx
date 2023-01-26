import { Form, Label, SupportText, HeaderContainer, SubmitContainer } from './authStyle'

import { Main, Button, Header, ErrorWarning, InputField } from '/src/components'
import { useListsStore } from '/src/stores'
import { auth, getAssociatedLists } from '/src/services'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, Link, Navigate } from 'react-router-dom'
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'

const Login = () => {
  const { register, handleSubmit } = useForm()
  const [error, setError] = useState()
  const navigate = useNavigate()
  const loadLists = useListsStore(s => s.loadLists)

  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('kicking user off login (to lists)');
      navigate('/lists')
    } else {
      console.log('no user detected: allowing login');
    }
  })


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
          setError('The credentials you provided were incorrect.')
        } else if (error.code) {
          setError(error.code)
        } else {
          setError('An unknown error occurred.')
        }
        console.error(error);
      })
  }

  return <Main $vCentered $hCentered>
    <HeaderContainer>
      <Header $hCentered>Login</Header>
    </HeaderContainer>
    <Form onSubmit={handleSubmit(loginFn)}>
      {error && <ErrorWarning>{error}</ErrorWarning>}
      <div>
        <Label htmlFor='email'>Email</Label>
        <InputField
          autoFocus={true}
          required={true}
          id='email'
          type='email'
          defaultValue={'test@test.com'}
          placeholder='johndoe@example.com'
          {...register('email')}
        />
      </div>
      <div>
        <Label htmlFor='password'>Password</Label>
        <InputField
          required={true}
          id='password'
          type='password'
          defaultValue={'testtest'}
          {...register('password')}
        />
      </div>
      <SubmitContainer>
        <Button type='submit'>Log in</Button>
        <SupportText>
          Don't have an account?{' '}
          <Link to='/register'>Register here!</Link>
        </SupportText>
      </SubmitContainer>
    </Form>

  </Main>
}

export default Login
