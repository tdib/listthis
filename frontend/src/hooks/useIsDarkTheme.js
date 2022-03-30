import { useState, useEffect } from 'react'

export default function useIsDarkScheme() {
  const darkSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)')
  const [isDarkScheme, setIsDarkScheme] = useState(darkSchemeQuery.matches)

  // Register listener
  useEffect(() => {
    darkSchemeQuery.addEventListener('change', e => setIsDarkScheme(e.matches))
  })

  return isDarkScheme
}
