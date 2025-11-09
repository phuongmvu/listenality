function Loader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-spotify-black">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-spotify-green border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <div className="text-spotify-green text-2xl font-bold">
          Loading your music...
        </div>
      </div>
    </div>
  )
}

export default Loader

