# Quick Setup Guide for Listenality

## Prerequisites
- Node.js (v16 or higher)
- A Spotify account
- A Spotify Developer account

## Step-by-Step Setup

### 1. Create Spotify Developer App

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Click "Create app"
3. Fill in the details:
   - **App name**: Listenality (or any name you prefer)
   - **App description**: Personal Spotify analytics app
   - **Redirect URI**: `http://127.0.0.1:3001/api/auth/spotify/callback`
   - **APIs used**: Web API
4. Click "Save"
5. You'll now see your **Client ID** and can view your **Client Secret**

### 2. Configure Environment Variables

1. Create a `.env` file in the root directory and add your credentials:
   ```env
   SPOTIFY_CLIENT_ID=your_client_id_from_spotify_dashboard
   SPOTIFY_CLIENT_SECRET=your_client_secret_from_spotify_dashboard
   SPOTIFY_REDIRECT_URI=http://127.0.0.1:3001/api/auth/spotify/callback
   PORT=3001
   CLIENT_URL=http://127.0.0.1:5173
   ```

### 3. Install Dependencies

Run this command in the project root:
```bash
npm run install-all
```

This will install dependencies for both the backend and frontend.

### 4. Start the Application

Run this command in the project root:
```bash
npm run dev
```

This will start:
- Backend server on http://127.0.0.1:3001
- Frontend app on http://127.0.0.1:5173

### 5. Use the App

1. Open http://127.0.0.1:5173 in your browser
2. Click "Login with Spotify"
3. Authorize the app
4. Explore your listening analytics!

## Features

- 📊 **Top Tracks**: Your most played songs
- 🎤 **Top Artists**: Your favorite artists
- 🎸 **Top Genres**: Your genre preferences
- 💃 **Music Vibe**: Audio features analysis (danceability, energy, happiness, acousticness)
- ⏰ **Time Ranges**: 
  - Last 3 months (short_term)
  - Last 6 months (medium_term)
  - Last 12 months (long_term)

## Troubleshooting

### "Invalid redirect URI" error
- Make sure you added `http://127.0.0.1:3001/api/auth/spotify/callback` to your Spotify app's Redirect URIs
- The URL must match exactly (including http://)
- Note: Spotify no longer accepts localhost URLs, use 127.0.0.1 instead

### "Failed to fetch" error
- Make sure both backend and frontend are running
- Check that your `.env` file is configured correctly
- Verify your Spotify credentials are correct

### Token expired
- Simply logout and login again to refresh your token

## Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS
- **Backend**: Node.js, Express
- **API**: Spotify Web API
- **Authentication**: OAuth 2.0

## Notes

- This app only requests **read-only** access to your Spotify data
- No data is stored on any server - everything is processed in real-time
- Your tokens are stored only in your browser's localStorage

Enjoy exploring your music taste! 🎵

