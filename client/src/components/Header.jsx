function Header({ profile, onLogout }) {
  return (
    <header className="bg-black border-b border-spotify-gray/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="text-2xl font-bold text-spotify-green">Listenality</div>
          </div>
          
          <div className="flex items-center space-x-4">
            {profile && (
              <div className="flex items-center space-x-3">
                {profile.images?.[0]?.url && (
                  <img
                    src={profile.images[0].url}
                    alt={profile.display_name}
                    className="w-10 h-10 rounded-full border-2 border-white/30"
                  />
                )}
                <span className="text-white font-medium hidden sm:block">
                  {profile.display_name}
                </span>
              </div>
            )}
            
            <button
              onClick={onLogout}
              className="bg-spotify-dark-gray hover:bg-spotify-gray text-white font-medium py-2 px-4 rounded-full transition-all duration-200 border border-spotify-gray/30"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

