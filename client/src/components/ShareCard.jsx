import { forwardRef } from 'react'

const ShareCard = forwardRef(({ profile, analytics, timeRange }, ref) => {
  if (!profile || !analytics) {
    return null
  }

  const getTimeRangeLabel = () => {
    switch (timeRange) {
      case 'short_term': return 'Last 3 months'
      case 'medium_term': return 'Last 6 months'
      case 'long_term': return 'Last 12 months'
      default: return 'Last 6 months'
    }
  }

  const topTracks = analytics.topTracks?.slice(0, 3) || []
  const topArtists = analytics.topArtists?.slice(0, 3) || []
  const topGenres = analytics.topGenres?.slice(0, 3) || []
  
  // Get first name only
  const firstName = profile.display_name?.split(' ')[0] || profile.display_name

  return (
    <div 
      ref={ref}
      className="w-[1080px] h-[1920px] p-16 flex flex-col"
      style={{ 
        fontFamily: 'Inter, sans-serif',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)'
      }}
    >
      {/* Header */}
      <div className="mb-12 pt-16">
        <h1 className="font-bold mb-3" style={{ fontSize: '90px' }}>
          <span className="text-white">{firstName}'s </span>
          <span className="text-white">listenality</span>
        </h1>
        <div className="text-white text-3xl">{getTimeRangeLabel()}</div>
      </div>

      {/* Stats */}
      <div className="space-y-12 flex-1">
        {/* Top Artists */}
        {topArtists.length > 0 && (
          <div className="rounded-2xl p-12" style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(10px)' }}>
            <div className="text-white text-4xl mb-8 uppercase tracking-wider font-semibold">
              Top Artists
            </div>
            <div className="space-y-6">
              {topArtists.map((artist, idx) => (
                <div key={artist.id} className="flex items-center space-x-5">
                  <span className="text-white/90 font-bold text-5xl w-16">{idx + 1}</span>
                  {artist.images?.[1]?.url && (
                    <img
                      src={artist.images[1].url}
                      alt={artist.name}
                      className="w-24 h-24 rounded-full"
                    />
                  )}
                  <div className="text-white text-3xl font-semibold truncate">
                    {artist.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Top Tracks */}
        {topTracks.length > 0 && (
          <div className="rounded-2xl p-12" style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(10px)' }}>
            <div className="text-white text-4xl mb-8 uppercase tracking-wider font-semibold">
              Top Tracks
            </div>
            <div className="space-y-6">
              {topTracks.map((track, idx) => (
                <div key={track.id} className="flex items-center space-x-5">
                  <span className="text-white/90 font-bold text-5xl w-16">{idx + 1}</span>
                  {track.album?.images?.[1]?.url && (
                    <img
                      src={track.album.images[1].url}
                      alt={track.name}
                      className="w-24 h-24 rounded-lg"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="text-white text-3xl font-semibold truncate">
                      {track.name}
                    </div>
                    <div className="text-white/70 text-xl truncate">
                      {track.artists.map(a => a.name).join(', ')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Top Genres */}
        {topGenres.length > 0 && (
          <div className="rounded-2xl p-12" style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(10px)' }}>
            <div className="text-white text-4xl mb-8 uppercase tracking-wider font-semibold">
              Top Genres
            </div>
            <div className="flex items-center justify-between gap-5">
              {topGenres.map((genre, idx) => (
                <div key={genre.genre} className="flex items-center space-x-3">
                  <span className="text-white/90 font-bold text-5xl">{idx + 1}</span>
                  <div className="text-white text-xl font-semibold capitalize">
                    {genre.genre}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="text-center mt-auto pt-12 pb-8">
        <div className="text-white/80 text-xl mb-2">Made with</div>
        <div className="text-white text-6xl font-bold">Listenality</div>
      </div>
    </div>
  )
})

ShareCard.displayName = 'ShareCard'

export default ShareCard

