function TimeRangeSelector({ timeRange, onChange, loading }) {
  const ranges = [
    { value: 'short_term', label: 'Last 3 months' },
    { value: 'medium_term', label: 'Last 6 months' },
    { value: 'long_term', label: 'Last 12 months' }
  ]

  return (
    <div className="flex justify-center mb-8">
      <div className="bg-spotify-dark-gray rounded-full p-1 inline-flex space-x-1 border border-spotify-gray/20">
        {ranges.map((range) => (
          <button
            key={range.value}
            onClick={() => !loading && onChange(range.value)}
            disabled={loading}
            className={`px-6 py-3 rounded-full font-light transition-all duration-300 ${
              timeRange === range.value
                ? 'bg-spotify-green text-white shadow-lg'
                : 'text-white hover:bg-spotify-gray/30'
            } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {range.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default TimeRangeSelector

