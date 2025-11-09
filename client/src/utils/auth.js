export const getTokenFromUrl = () => {
  return window.location.hash
    .substring(1)
    .split('&')
    .reduce((initial, item) => {
      let parts = item.split('=')
      initial[parts[0]] = decodeURIComponent(parts[1])
      return initial
    }, {})
}

export const loginUrl = () => {
  const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:3001'
  return `${API_URL}/api/auth/spotify/login`
}

