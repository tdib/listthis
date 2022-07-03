import { LoginForm, Label, SupportText, Link } from './loginStyle'
import { Main, Button, Header, ErrorWarning } from '/src/components'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '/src/config/firebase'
import { useUserStore, useListsStore } from '/src/stores'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { getAssociatedLists } from '/src/services/lists'

const Login = () => {
  const { register, handleSubmit } = useForm()
  const { unloadUser, loadUser, userID, displayName, email: emailFromStore, associatedListIDs } = useUserStore()
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
        
        console.log('associated lists (post return)', associatedLists);
        // TODO: do i need zustand?
        loadUser({
          userID: user.uid,
          email: user.email,
          displayName: user.displayName,
          associatedListIDs: associatedLists.map(list => list.listID),
        })
        console.log('loaded user:', userID, displayName, emailFromStore, associatedListIDs);
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
    <Header>Login</Header>
    <LoginForm onSubmit={handleSubmit(loginFn)}>
      {error && <ErrorWarning>{error}</ErrorWarning>}
      <div>
        <Label htmlFor='email'>Email</Label>
        <input
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
        <input
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
