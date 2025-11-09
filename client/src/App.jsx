import { useState, useEffect } from 'react'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import { getTokenFromUrl } from './utils/auth'

function App() {
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for token in URL hash (from OAuth callback)
    const hash = getTokenFromUrl()
    window.location.hash = ''
    
    if (hash.access_token) {
      setToken(hash.access_token)
      localStorage.setItem('spotify_access_token', hash.access_token)
      localStorage.setItem('spotify_refresh_token', hash.refresh_token)
      localStorage.setItem('spotify_token_expiry', Date.now() + hash.expires_in * 1000)
    } else {
      // Check for existing token in localStorage
      const storedToken = localStorage.getItem('spotify_access_token')
      const tokenExpiry = localStorage.getItem('spotify_token_expiry')
      
      if (storedToken && tokenExpiry && Date.now() < tokenExpiry) {
        setToken(storedToken)
      }
    }
    
    setLoading(false)
  }, [])

  const handleLogout = () => {
    setToken(null)
    localStorage.removeItem('spotify_access_token')
    localStorage.removeItem('spotify_refresh_token')
    localStorage.removeItem('spotify_token_expiry')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-white text-2xl font-bold">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {!token ? (
        <Login />
      ) : (
        <Dashboard token={token} onLogout={handleLogout} />
      )}
    </div>
  )
}

export default App

