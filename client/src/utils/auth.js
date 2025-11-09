export const loginUrl = () => {
  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID
  const redirectUri =
    import.meta.env.VITE_SPOTIFY_REDIRECT_URI ||
    `${window.location.origin}/api/auth/spotify/callback`
  const scopes = [
    'user-read-private',
    'user-read-email',
    'user-top-read',
    'user-read-recently-played',
    'user-library-read',
    'playlist-read-private',
    'playlist-read-collaborative'
  ]

  const url = new URL('https://accounts.spotify.com/authorize')
  url.searchParams.set('response_type', 'code')
  url.searchParams.set('client_id', clientId)
  url.searchParams.set('scope', scopes.join(' '))
  url.searchParams.set('redirect_uri', redirectUri)
  url.searchParams.set('state', Math.random().toString(36).slice(2))

  return url.toString()
}
