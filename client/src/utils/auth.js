export const getTokenFromUrl = () => {
  if (typeof window === 'undefined') {
    return {}
  }
  return window.location.hash
    .substring(1)
    .split('&')
    .reduce((initial, item) => {
      const parts = item.split('=')
      if (!parts[0]) return initial
      initial[parts[0]] = decodeURIComponent(parts[1] || '')
      return initial
    }, {})
}

export const loginUrl = () => {
  if (import.meta.env.PROD) {
    return 'https://accounts.spotify.com/authorize?' + new URLSearchParams({
      response_type: 'code',
      client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
      scope: [
        'user-read-private',
        'user-read-email',
        'user-top-read',
        'user-read-recently-played',
        'user-library-read',
        'playlist-read-private',
        'playlist-read-collaborative'
      ].join(' '),
      redirect_uri: import.meta.env.VITE_SPOTIFY_REDIRECT_URI ||
        `${typeof window !== 'undefined' ? window.location.origin : ''}/api/auth/spotify/callback`,
      state: Math.random().toString(36).slice(2)
    }).toString()
  }

  const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:3001'
  return `${apiUrl}/api/auth/spotify/login`
}