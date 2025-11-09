import { useState, useEffect } from 'react'
import { getUserProfile, getAnalytics, getAccountStats } from '../utils/api'
import Header from './Header'
import TimeRangeSelector from './TimeRangeSelector'
import TopTracks from './TopTracks'
import TopArtists from './TopArtists'
import TopGenres from './TopGenres'
import MusicProfile from './MusicProfile'
import AccountStats from './AccountStats'
import ShareButton from './ShareButton'
import Loader from './Loader'

function Dashboard({ token, onLogout }) {
  const [profile, setProfile] = useState(null)
  const [analytics, setAnalytics] = useState(null)
  const [accountStats, setAccountStats] = useState(null)
  const [timeRange, setTimeRange] = useState('medium_term')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchData()
  }, [timeRange])

  useEffect(() => {
    fetchAccountStats()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const [profileRes, analyticsRes] = await Promise.all([
        getUserProfile(token),
        getAnalytics(token, timeRange)
      ])
      
      setProfile(profileRes.data)
      setAnalytics(analyticsRes.data)
    } catch (err) {
      console.error('Error fetching data:', err)
      setError('Failed to load your data. Please try logging in again.')
      
      // If token is invalid, logout
      if (err.response?.status === 401) {
        setTimeout(onLogout, 2000)
      }
    } finally {
      setLoading(false)
    }
  }

  const fetchAccountStats = async () => {
    try {
      const statsRes = await getAccountStats(token)
      setAccountStats(statsRes.data)
    } catch (err) {
      console.error('Error fetching account stats:', err)
      // Don't show error for account stats, just skip displaying them
    }
  }

  const getTimeRangeLabel = () => {
    switch (timeRange) {
      case 'short_term':
        return '3 Months'
      case 'medium_term':
        return '6 Months'
      case 'long_term':
        return '12 Months'
      default:
        return '6 Months'
    }
  }

  if (loading && !analytics) {
    return <Loader />
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-red-500/20 backdrop-blur-lg rounded-2xl p-8 text-white text-center">
          <div className="text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold mb-2">Oops!</h2>
          <p>{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-12 bg-spotify-black">
      <Header profile={profile} onLogout={onLogout} />
      
      {/* Share Button - Only show when data is loaded */}
      {!loading && analytics && (
        <ShareButton 
          profile={profile} 
          analytics={analytics} 
          timeRange={timeRange}
        />
      )}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Welcome Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Discover your listenality
          </h1>
          <p className="text-white/80 text-lg">
            Uncover your music identity and see how it evolves with every listen.
          </p>
        </div>

        {/* Account Stats */}
        {accountStats && (
          <div className="mb-8">
            <AccountStats stats={accountStats} />
          </div>
        )}

        {/* Time Range Selector */}
        <TimeRangeSelector
          timeRange={timeRange}
          onChange={setTimeRange}
          loading={loading}
        />

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-pulse text-white text-xl">Loading your {getTimeRangeLabel()} stats...</div>
          </div>
        ) : (
          <div className="space-y-8 animate-fade-in">

            {/* Music Profile */}
            <MusicProfile 
              tracks={analytics?.topTracks || []} 
              artists={analytics?.topArtists || []} 
            />

            {/* Top Tracks & Artists - Side by side on wider screens */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <TopTracks tracks={analytics?.topTracks || []} />
              <TopArtists artists={analytics?.topArtists || []} />
            </div>

            {/* Top Genres */}
            <TopGenres genres={analytics?.topGenres || []} />
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard

