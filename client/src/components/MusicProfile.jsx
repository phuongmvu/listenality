function MusicProfile({ tracks, artists }) {
  if (!tracks || !artists || tracks.length === 0 || artists.length === 0) {
    return null
  }

  // POPULARITY ANALYSIS
  const getPopularityAnalysis = () => {
    const avgTrackPopularity = tracks.reduce((sum, t) => sum + t.popularity, 0) / tracks.length
    const avgArtistPopularity = artists.reduce((sum, a) => sum + a.popularity, 0) / artists.length
    const overallPopularity = (avgTrackPopularity + avgArtistPopularity) / 2

    let category, description, score
    if (overallPopularity >= 75) {
      category = "Mainstream Listener"
      description = "You're tuned into what's trending! Your music taste aligns with the current popular hits."
      score = Math.round(overallPopularity)
    } else if (overallPopularity >= 50) {
      category = "Balanced Explorer"
      description = "You have a healthy mix of popular hits and lesser-known gems. You're open to both mainstream and indie."
      score = Math.round(overallPopularity)
    } else if (overallPopularity >= 30) {
      category = "Underground Enthusiast"
      description = "You seek out unique sounds beyond the mainstream. You're discovering artists before they blow up."
      score = Math.round(overallPopularity)
    } else {
      category = "Deep Digger"
      description = "You're a true music explorer! You find the most underground, niche artists that few others know about."
      score = Math.round(overallPopularity)
    }

    return { category, description, score }
  }

  // ERA ANALYSIS
  const getEraAnalysis = () => {
    const currentDate = new Date()
    const releaseDates = tracks
      .filter(t => t.album?.release_date)
      .map(t => new Date(t.album.release_date))
    
    if (releaseDates.length === 0) {
      return null
    }

    // Calculate average age in days
    const ageInDays = releaseDates.map(date => {
      const diffTime = currentDate - date
      return Math.floor(diffTime / (1000 * 60 * 60 * 24))
    })
    
    const avgDays = Math.round(ageInDays.reduce((sum, d) => sum + d, 0) / ageInDays.length)
    const avgMonths = Math.round(avgDays / 30.44)
    const avgYears = Math.round(avgDays / 365.25)
    
    // Determine display unit and value
    let displayValue, displayUnit, displayLabel
    if (avgDays <= 30) {
      displayValue = avgDays
      displayUnit = 'd'
      displayLabel = `${avgDays} ${avgDays === 1 ? 'day' : 'days'} old`
    } else if (avgDays <= 365) {
      displayValue = avgMonths
      displayUnit = 'mo'
      displayLabel = `${avgMonths} ${avgMonths === 1 ? 'month' : 'months'} old`
    } else {
      displayValue = avgYears
      displayUnit = 'y'
      displayLabel = `${avgYears} ${avgYears === 1 ? 'year' : 'years'} old`
    }
    
    const vintageTracksPercent = Math.round((ageInDays.filter(d => d > 3650).length / ageInDays.length) * 100)
    
    let category, description
    if (avgMonths <= 24) {
      category = "Modern Music Fan"
      description = "You're all about the latest releases! Your playlist is fresh with new music from the current era."
    } else if (avgMonths <= 60) {
      category = "Contemporary Listener"
      description = "You enjoy recent hits and trending sounds. You keep up with what's current while having some favorites."
    } else if (avgMonths <= 120) {
      category = "Recent Decade Dweller"
      description = "You appreciate music from the last decade. A nice blend of modern and somewhat established tracks."
    } else if (avgMonths <= 240) {
      category = "Nostalgic Soul"
      description = "You have a taste for music from years past. Throwbacks and classics are your go-to."
    } else {
      category = "Classic Curator"
      description = "You're a connoisseur of timeless music! You appreciate the golden eras and legendary tracks."
    }

    return { category, description, displayValue, displayUnit, displayLabel, vintagePercent: vintageTracksPercent }
  }

  // LISTENING DIVERSITY
  const getDiversityAnalysis = () => {
    // Count unique artists in tracks
    const trackArtists = new Set()
    tracks.forEach(track => {
      track.artists.forEach(artist => trackArtists.add(artist.id))
    })
    
    const uniqueArtistCount = trackArtists.size
    const diversityRatio = (uniqueArtistCount / tracks.length) * 100
    
    // Check artist follower spread
    const followerCounts = artists.map(a => a.followers?.total || 0)
    const maxFollowers = Math.max(...followerCounts)
    const minFollowers = Math.min(...followerCounts.filter(f => f > 0))
    const spread = maxFollowers > 0 ? Math.log10(maxFollowers / Math.max(minFollowers, 1)) : 0
    
    let category, description, score
    if (diversityRatio >= 80) {
      category = "Variety Seeker"
      description = "You love exploring different artists! Your playlist is incredibly diverse with minimal repetition."
      score = Math.round(diversityRatio)
    } else if (diversityRatio >= 60) {
      category = "Balanced Listener"
      description = "You enjoy variety but also have your favorites. A healthy mix of discovery and loyalty."
      score = Math.round(diversityRatio)
    } else if (diversityRatio >= 40) {
      category = "Focused Fan"
      description = "You stick with artists you love. You're loyal to your favorites and enjoy their full discographies."
      score = Math.round(diversityRatio)
    } else {
      category = "Devoted Enthusiast"
      description = "You're deeply committed to specific artists. When you find someone you love, you dive deep!"
      score = Math.round(diversityRatio)
    }

    return { category, description, score, uniqueArtists: uniqueArtistCount }
  }

  const popularity = getPopularityAnalysis()
  const era = getEraAnalysis()
  const diversity = getDiversityAnalysis()

  return (
    <div className="bg-spotify-dark-gray rounded-2xl p-6 sm:p-8 border border-spotify-gray/20">
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
        Your music profile
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Popularity Analysis */}
        <div className="bg-black/30 rounded-xl p-5 border border-spotify-gray/20">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-spotify-green font-bold text-sm uppercase tracking-wider">
              Popularity
            </h3>
            <div className="text-2xl font-bold text-white">
              {popularity.score}
            </div>
          </div>
          <h4 className="text-white font-bold text-lg mb-2">
            {popularity.category}
          </h4>
          <p className="text-white/70 text-sm leading-relaxed">
            {popularity.description}
          </p>
          <div className="mt-4 bg-black/40 rounded-full h-2 overflow-hidden">
            <div
              className="bg-spotify-green h-full rounded-full transition-all duration-1000"
              style={{ width: `${popularity.score}%` }}
            />
          </div>
        </div>

        {/* Era Analysis */}
        {era && (
          <div className="bg-black/30 rounded-xl p-5 border border-spotify-gray/20">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-spotify-green font-bold text-sm uppercase tracking-wider">
                Music Era
              </h3>
              <div className="text-2xl font-bold text-white">
                {era.displayValue}{era.displayUnit}
              </div>
            </div>
            <h4 className="text-white font-bold text-lg mb-2">
              {era.category}
            </h4>
            <p className="text-white/70 text-sm leading-relaxed">
              {era.description}
            </p>
            {era.vintagePercent > 0 && (
              <div className="text-xs text-white/60 mt-3">
                {era.vintagePercent}% vintage (10+ years)
              </div>
            )}
          </div>
        )}

        {/* Diversity Analysis */}
        <div className="bg-black/30 rounded-xl p-5 border border-spotify-gray/20">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-spotify-green font-bold text-sm uppercase tracking-wider">
              Diversity
            </h3>
            <div className="text-2xl font-bold text-white">
              {diversity.score}%
            </div>
          </div>
          <h4 className="text-white font-bold text-lg mb-2">
            {diversity.category}
          </h4>
          <p className="text-white/70 text-sm leading-relaxed mb-3">
            {diversity.description}
          </p>
          <div className="text-xs text-white/60">
            {diversity.uniqueArtists} unique artists in top {tracks.length} tracks
          </div>
        </div>
      </div>
    </div>
  )
}

export default MusicProfile

