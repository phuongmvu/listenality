# Listenality

Discover your music identity with Listenality - a beautiful Spotify analytics web app that reveals your listening personality, top tracks, artists, genres, and how your taste evolves over time.

> **Important:** Spotify requires `127.0.0.1` instead of `localhost` in URIs. See setup instructions below.

## Features

### Music Analytics
- **Your Library** - Total saved tracks, albums, and playlists
- **Music Profile** - Popularity analysis, era preferences, and listening diversity
- **Top Tracks** - Your most played songs with album art and Spotify links
- **Top Artists** - Favorite artists with follower counts and profiles
- **Top Genres** - Genre distribution with artist breakdowns
- **Share Card** - Export your stats as a beautiful gradient-themed image optimized for Instagram Stories (1080x1920)

### Time Ranges
- Last 3 months
- Last 6 months  
- Last 12 months

### Design
- Modern UI with vibrant gradient themes
- Glassmorphism effects on shareable cards
- Fully responsive (mobile, tablet, desktop)
- Beautiful Instagram Stories-optimized share cards (1080x1920)

## Setup

### 1. Create a Spotify App

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Click "Create app"
3. Fill in the details:
   - App name: Listenality (or your choice)
   - Redirect URI: `http://127.0.0.1:3001/api/auth/spotify/callback`
4. Save and copy your Client ID and Client Secret

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```env
SPOTIFY_CLIENT_ID=your_client_id_here
SPOTIFY_CLIENT_SECRET=your_client_secret_here
SPOTIFY_REDIRECT_URI=http://127.0.0.1:3001/api/auth/spotify/callback
PORT=3001
CLIENT_URL=http://127.0.0.1:5173
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-1.5-flash
# Set only for local development so backend /login redirect works
ALLOW_SPOTIFY_LOGIN_REDIRECT=true
```

Set `GEMINI_API_KEY` in your backend environment (Render + local `.env`). Override `GEMINI_MODEL` if you want a different Gemini variant.

For the Vite client, create `client/.env`:

```env
VITE_API_URL=http://127.0.0.1:3001
VITE_SPOTIFY_CLIENT_ID=your_client_id_here
VITE_SPOTIFY_REDIRECT_URI=http://127.0.0.1:5173
```

**Important:** Use `127.0.0.1` instead of `localhost` - Spotify no longer accepts localhost URLs!

### 3. Install Dependencies

```bash
npm run install-all
```

### 4. Run the App

```bash
npm run dev
```

The app will be available at:
- Frontend: http://127.0.0.1:5173
- Backend: http://127.0.0.1:3001

## Tech Stack

- **Frontend**: React + Vite, Tailwind CSS
- **Backend**: Node.js + Express
- **API**: Spotify Web API
- **Charts**: Chart.js
- **Image Export**: html2canvas

## How It Works

1. Users authenticate with their Spotify account
2. The app fetches listening history from Spotify API
3. Data is processed to generate insights and trends
4. Beautiful visualizations display top tracks, artists, and more

## License

MIT

