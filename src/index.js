import { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { createElement } from 'react'
import { setup } from 'goober'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import * as Pages from './pages'

// Set up goober to use React
setup(
  createElement, undefined, undefined,
  // Remove transient props from the DOM
  props => Object.keys(props).forEach(p => p[0] === '$' && delete props[p])
)

// Create react root
const root = createRoot(
  document.getElementById('app')
)

// Render app
root.render(
  <BrowserRouter>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* TODO: only navigate if logged out, else list selection */}
        <Route path='/' element={<Navigate to='/login' />} />
        <Route path='/login' element={<Pages.Login />} />
        <Route path='/register' element={<Pages.Register />} />
        <Route path='/lists' element={<Pages.ListSelection />} />
        <Route path='/list/:id' element={<Pages.List />} />
        <Route path='*' element={<h1>404</h1>} />
      </Routes>
    </Suspense>
  </BrowserRouter>
)
