import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:3001'

const api = axios.create({
  baseURL: API_BASE_URL,
})

export const getUserProfile = (token) => {
  return api.get('/api/me', {
    headers: { Authorization: `Bearer ${token}` }
  })
}

export const getTopTracks = (token, timeRange = 'medium_term', limit = 50) => {
  return api.get('/api/top-tracks', {
    headers: { Authorization: `Bearer ${token}` },
    params: { time_range: timeRange, limit }
  })
}

export const getTopArtists = (token, timeRange = 'medium_term', limit = 50) => {
  return api.get('/api/top-artists', {
    headers: { Authorization: `Bearer ${token}` },
    params: { time_range: timeRange, limit }
  })
}

export const getAnalytics = (token, timeRange = 'medium_term') => {
  return api.get('/api/analytics', {
    headers: { Authorization: `Bearer ${token}` },
    params: { time_range: timeRange }
  })
}

export const getAccountStats = (token) => {
  return api.get('/api/account-stats', {
    headers: { Authorization: `Bearer ${token}` }
  })
}

export default api

