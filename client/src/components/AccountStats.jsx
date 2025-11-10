function AccountStats({ stats }) {
  if (!stats) {
    return null
  }

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k'
    }
    return num.toString()
  }

  return (
    <div className="bg-spotify-dark-gray rounded-2xl p-6 sm:p-8 border border-spotify-gray/20">
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">
        In a nutshell
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Saved Tracks */}
        <div className="bg-black/30 rounded-xl p-5 text-center border border-spotify-gray/20 hover:border-spotify-green/50 transition-all duration-300">
          <div className="text-4xl font-bold text-spotify-green mb-2">
            {formatNumber(stats.savedTracks)}
          </div>
          <div className="text-white font-semibold mb-1">
            Saved Tracks
          </div>
          <div className="text-white/60 text-xs">
            Songs in your library
          </div>
        </div>

        {/* Saved Albums */}
        <div className="bg-black/30 rounded-xl p-5 text-center border border-spotify-gray/20 hover:border-spotify-green/50 transition-all duration-300">
          <div className="text-4xl font-bold text-spotify-green mb-2">
            {formatNumber(stats.savedAlbums)}
          </div>
          <div className="text-white font-semibold mb-1">
            Saved Albums
          </div>
          <div className="text-white/60 text-xs">
            Albums in your collection
          </div>
        </div>

        {/* Total Playlists */}
        <div className="bg-black/30 rounded-xl p-5 text-center border border-spotify-gray/20 hover:border-spotify-green/50 transition-all duration-300">
          <div className="text-4xl font-bold text-spotify-green mb-2">
            {formatNumber(stats.totalPlaylists)}
          </div>
          <div className="text-white font-semibold mb-1">
            Playlists
          </div>
          <div className="text-white/60 text-xs">
            Created & followed
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountStats

