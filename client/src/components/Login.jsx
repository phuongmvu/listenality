import { loginUrl } from '../utils/auth'

function Login() {
  const handleLogin = () => {
    window.location.href = loginUrl()
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-spotify-black">
      <div className="max-w-md w-full animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold text-white mb-4 animate-slide-up">
            Listenality
          </h1>
          <p className="text-xl text-white/90 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Your personalized Spotify recap
          </p>
        </div>

        <div className="bg-spotify-dark-gray rounded-2xl p-8 shadow-2xl border border-spotify-gray/30 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="space-y-6 mb-8">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-spotify-green rounded-full mt-2"></div>
              <div>
                <h3 className="text-white font-semibold">Your listening habits</h3>
                <p className="text-white/80 text-sm">See your top artists, tracks, and genres.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-spotify-green rounded-full mt-2"></div>
              <div>
                <h3 className="text-white font-semibold">Your taste over time</h3>
                <p className="text-white/80 text-sm">Compare your 3, 6, and 12-month trends.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-spotify-green rounded-full mt-2"></div>
              <div>
                <h3 className="text-white font-semibold">Taste breakdown</h3>
                <p className="text-white/80 text-sm">Understand your unique listening personality.</p>
              </div>
            </div>
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-spotify-green hover:bg-spotify-green-dark text-white py-4 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Login with Spotify
          </button>

          <p className="text-spotify-gray text-xs text-center mt-4">
            We only request read access to your Spotify activity
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login

