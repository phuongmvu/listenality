function TopGenres({ genres }) {
  if (!genres || genres.length === 0) {
    return null
  }

  const maxCount = Math.max(...genres.map(g => g.count))

  return (
    <div className="bg-spotify-dark-gray rounded-2xl p-6 sm:p-8 border border-spotify-gray/20">
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
        Your top genres
      </h2>
      
      <div className="space-y-4">
        {genres.map((genre, index) => {
          const percentage = (genre.count / maxCount) * 100
          
          return (
            <div key={genre.genre} className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <span className="text-white/60 font-bold w-6">{index + 1}</span>
                  <span className="text-white font-medium capitalize">
                    {genre.genre}
                  </span>
                </div>
                <span className="text-white/80 text-sm">
                  {genre.count} {genre.count === 1 ? 'artist' : 'artists'}
                </span>
              </div>
              
              {genre.artists && genre.artists.length > 0 && (
                <div className="text-white/60 text-xs ml-9">
                  {genre.artists.join(', ')}
                </div>
              )}
              
              <div className="bg-black/40 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-spotify-green h-full rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default TopGenres

