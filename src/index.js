import * as Pages from './pages'
import { Main, Spinner } from '/src/components'
import { auth } from '/src/services'

import { Suspense, createElement } from 'react'
import { setup } from 'goober'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { initializeApp } from 'firebase/app'

// Set up goober to use React
setup(
  createElement, undefined, undefined,
  // Remove transient props from the DOM
  props => Object.keys(props).forEach(p => p[0] === '$' && delete props[p])
)

// signOut(auth)
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log('Login detected:', user);
  } else {
    console.log('User signed out');
  }
})


// Create react root
const root = createRoot(
  document.getElementById('app')
)

// Render app
root.render(
  <BrowserRouter>
    <Suspense fallback={<Main><Spinner /></Main>}>
      <Routes>
        {/* TODO: only navigate if logged out, else list selection */}
        {/* <Route path='/' element={auth.currentUser ? <Pages.ListSelection /> : <Navigate to='/login' />} /> */}
        <Route path='/' element={<Navigate to='/login' />} />
        <Route path='/login' element={<Pages.Login />} />
        <Route path='/register' element={<Pages.Register />} />
        <Route path='/lists' element={<Pages.ListSelection />} />
        <Route path='/list/:listUID' element={<Pages.List />} />
        <Route path='*' element={<Pages.PageNotFound />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
)
