const express = require('express');
const axios = require('axios');

const router = express.Router();

// Middleware to check for access token
const requireAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'No access token provided' });
  }
  req.token = token;
  next();
};

// Get user profile
router.get('/me', requireAuth, async (req, res) => {
  try {
    const response = await axios.get('https://api.spotify.com/v1/me', {
      headers: { 'Authorization': `Bearer ${req.token}` }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching user profile:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch user profile' });
  }
});

// Get top tracks for a time range
router.get('/top-tracks', requireAuth, async (req, res) => {
  const timeRange = req.query.time_range || 'medium_term'; // short_term, medium_term, long_term
  const limit = req.query.limit || 50;

  try {
    const response = await axios.get('https://api.spotify.com/v1/me/top/tracks', {
      headers: { 'Authorization': `Bearer ${req.token}` },
      params: { time_range: timeRange, limit }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching top tracks:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch top tracks' });
  }
});

// Get top artists for a time range
router.get('/top-artists', requireAuth, async (req, res) => {
  const timeRange = req.query.time_range || 'medium_term';
  const limit = req.query.limit || 50;

  try {
    const response = await axios.get('https://api.spotify.com/v1/me/top/artists', {
      headers: { 'Authorization': `Bearer ${req.token}` },
      params: { time_range: timeRange, limit }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching top artists:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch top artists' });
  }
});

// Get recently played tracks
router.get('/recently-played', requireAuth, async (req, res) => {
  const limit = req.query.limit || 50;

  try {
    const response = await axios.get('https://api.spotify.com/v1/me/player/recently-played', {
      headers: { 'Authorization': `Bearer ${req.token}` },
      params: { limit }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching recently played:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch recently played' });
  }
});

// Get account stats
router.get('/account-stats', requireAuth, async (req, res) => {
  try {
    const [tracksResponse, albumsResponse, playlistsResponse] = await Promise.all([
      axios.get('https://api.spotify.com/v1/me/tracks', {
        headers: { 'Authorization': `Bearer ${req.token}` },
        params: { limit: 1 }
      }),
      axios.get('https://api.spotify.com/v1/me/albums', {
        headers: { 'Authorization': `Bearer ${req.token}` },
        params: { limit: 1 }
      }),
      axios.get('https://api.spotify.com/v1/me/playlists', {
        headers: { 'Authorization': `Bearer ${req.token}` },
        params: { limit: 1 }
      })
    ]);

    res.json({
      savedTracks: tracksResponse.data.total,
      savedAlbums: albumsResponse.data.total,
      totalPlaylists: playlistsResponse.data.total
    });
  } catch (error) {
    console.error('Error fetching account stats:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch account stats' });
  }
});

// Get analytics summary
router.get('/analytics', requireAuth, async (req, res) => {
  const timeRange = req.query.time_range || 'medium_term';

  try {
    // Fetch top tracks and artists in parallel
    const [tracksResponse, artistsResponse] = await Promise.all([
      axios.get('https://api.spotify.com/v1/me/top/tracks', {
        headers: { 'Authorization': `Bearer ${req.token}` },
        params: { time_range: timeRange, limit: 50 }
      }),
      axios.get('https://api.spotify.com/v1/me/top/artists', {
        headers: { 'Authorization': `Bearer ${req.token}` },
        params: { time_range: timeRange, limit: 50 }
      })
    ]);

    const tracks = tracksResponse.data.items;
    const artists = artistsResponse.data.items;

    // Extract genre data from artists with artist names
    const genreData = {};
    artists.forEach(artist => {
      artist.genres.forEach(genre => {
        if (!genreData[genre]) {
          genreData[genre] = {
            count: 0,
            artists: []
          };
        }
        genreData[genre].count++;
        genreData[genre].artists.push(artist.name);
      });
    });

    // Sort genres by count and format
    const topGenres = Object.entries(genreData)
      .sort((a, b) => b[1].count - a[1].count)
      .slice(0, 5)
      .map(([genre, data]) => ({ 
        genre, 
        count: data.count,
        artists: data.artists
      }));

    // Note: Audio features endpoint may return 403 without Extended Quota Mode
    let audioFeatures = null;

    res.json({
      timeRange,
      topTracks: tracks.slice(0, 5),
      topArtists: artists.slice(0, 5),
      topGenres,
      audioFeatures,
      totalTracks: tracks.length,
      totalArtists: artists.length
    });
  } catch (error) {
    console.error('Error fetching analytics:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch analytics' });
  }
});

module.exports = router;

