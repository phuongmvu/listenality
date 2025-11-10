function AIInsights({ insight, loading, error, onRetry, hasData }) {
  const showPlaceholder = !loading && !error && !insight
  const showMissingData = showPlaceholder && !hasData

  return (
    <section className="bg-spotify-dark-gray rounded-2xl p-6 sm:p-8 border border-spotify-gray/20 text-white">
      <div className="flex flex-col gap-4">
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Your listenality</h2>
          <p className="text-white/70">
            Custom vibe check based on your listening activities
          </p>
        </div>

        <div className="relative overflow-hidden rounded-xl border border-spotify-gray/20 bg-gradient-to-br from-spotify-green/20 via-transparent to-spotify-purple/20 p-6 sm:p-7 min-h-[200px]">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -inset-16 bg-gradient-to-tr from-spotify-green via-spotify-purple to-fuchsia-500 opacity-40 blur-3xl" />
          </div>

          <div className="relative flex flex-col gap-5">
            {loading && (
              <div className="space-y-4 animate-pulse">
                <div className="h-4 bg-white/10 rounded w-2/3" />
                <div className="h-4 bg-white/10 rounded w-11/12" />
                <div className="h-4 bg-white/10 rounded w-3/4" />
                <div className="h-4 bg-white/10 rounded w-5/6" />
              </div>
            )}

            {!loading && error && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-lg font-medium">
                  <span role="img" aria-label="warning">
                    ⚠️
                  </span>
                  Couldn&apos;t fetch your listenality right now.
                </div>
                <p className="text-white/70">
                  Something went wrong while reaching the AI service. Please try again.
                </p>
                <button
                  type="button"
                  onClick={onRetry}
                  className="inline-flex items-center justify-center rounded-full bg-spotify-green/80 px-5 py-2 text-sm font-semibold text-black hover:bg-spotify-green transition"
                >
                  Refresh insight
                </button>
              </div>
            )}

            {!loading && !error && insight && (
              <div className="space-y-4">
                {insight
                  .split('\n')
                  .map(paragraph => paragraph.trim())
                  .filter(Boolean)
                  .map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-base leading-relaxed text-white/60 font-light"
                    >
                      {paragraph}
                    </p>
                  ))}
              </div>
            )}

            {showMissingData && (
              <div className="space-y-3 text-white/70">
                <p className="text-lg font-semibold text-white">
                  Waiting on more listening data
                </p>
                <p>
                  Once we have enough listening data, your AI reading will appear here.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AIInsights

