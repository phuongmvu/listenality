function TopArtists({ artists }) {
  if (!artists || artists.length === 0) {
    return null
  }

  return (
    <div className="bg-spotify-dark-gray rounded-2xl p-6 sm:p-8 border border-spotify-gray/20">
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
        Your top artists
      </h2>
      
      <div className="space-y-3">
        {artists.slice(0, 5).map((artist, index) => (
          <div
            key={artist.id || index}
            className="flex items-center space-x-4 bg-black/30 hover:bg-spotify-gray/20 rounded-xl p-4 transition-all duration-200 transform hover:scale-[1.02]"
          >
            <div className="text-2xl font-bold text-white/60 w-8 text-center">
              {index + 1}
            </div>
            
            {artist.images?.[2]?.url && (
              <img
                src={artist.images[2].url}
                alt={artist.name}
                className="w-16 h-16 rounded-full shadow-lg"
              />
            )}
            
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-semibold truncate">
                {artist.name}
              </h3>
              <p className="text-white/80 text-sm truncate">
                {artist.followers?.total?.toLocaleString() || '0'} followers
              </p>
            </div>
            
            {artist.external_urls?.spotify && (
              <a
                href={artist.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="text-spotify-green hover:text-green-400 transition-colors"
                title="Open in Spotify"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default TopArtists

