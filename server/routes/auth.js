const express = require('express');
const axios = require('axios');
const querystring = require('querystring');

const router = express.Router();

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;
// Generate random string for state
const generateRandomString = (length) => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const isProduction = process.env.NODE_ENV === 'production';

// Login endpoint - redirects to Spotify auth (disabled by default in production)
router.get('/login', (req, res) => {
  if (isProduction && process.env.ALLOW_SPOTIFY_LOGIN_REDIRECT !== 'true') {
    return res
      .status(403)
      .type('text/html')
      .send(`
        <!doctype html>
        <html lang="en">
          <head>
            <meta charset="utf-8" />
            <title>Listenality Login</title>
            <style>
              body { margin: 0; font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; background: #000; color: #fff; display: flex; justify-content: center; align-items: center; min-height: 100vh; padding: 2rem; }
              .card { max-width: 520px; background: rgba(18, 18, 18, 0.85); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 24px; padding: 2.5rem; text-align: center; box-shadow: 0 25px 60px -20px rgba(0, 0, 0, 0.65); }
              h1 { font-size: 1.75rem; margin-bottom: 1rem; }
              p { color: rgba(255, 255, 255, 0.7); line-height: 1.6; }
              a { display: inline-flex; align-items: center; gap: 0.5rem; margin-top: 1.75rem; padding: 0.85rem 1.6rem; border-radius: 9999px; background: #1DB954; color: #000; text-decoration: none; font-weight: 600; }
              a:hover { background: #1ed760; }
            </style>
          </head>
          <body>
            <div class="card">
              <h1>Login from the Listenality app</h1>
              <p>For security reasons this login endpoint isn’t accessible directly. Please open the Listenality dashboard and use the “Login with Spotify” button to continue.</p>
              <a href="${process.env.CLIENT_URL || 'https://listenality.vercel.app'}">Go to Listenality</a>
            </div>
          </body>
        </html>
      `);
  }

  const state = generateRandomString(16);
  const scope = 'user-read-private user-read-email user-top-read user-read-recently-played user-library-read playlist-read-private playlist-read-collaborative';

  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: CLIENT_ID,
      scope: scope,
      redirect_uri: REDIRECT_URI,
      state: state
    }));
});

// Callback endpoint - handles Spotify redirect
router.get('/callback', async (req, res) => {
  const code = req.query.code || null;
  const state = req.query.state || null;

  if (state === null) {
    res.redirect(`${process.env.CLIENT_URL}/#` + querystring.stringify({ error: 'state_mismatch' }));
  } else {
    try {
      const response = await axios.post('https://accounts.spotify.com/api/token', 
        querystring.stringify({
          code: code,
          redirect_uri: REDIRECT_URI,
          grant_type: 'authorization_code'
        }), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')
          }
        }
      );

      const { access_token, refresh_token, expires_in } = response.data;

      // Redirect to frontend with tokens
      res.redirect(`${process.env.CLIENT_URL}/#` + querystring.stringify({
        access_token,
        refresh_token,
        expires_in
      }));
    } catch (error) {
      console.error('Error getting token:', error.response?.data || error.message);
      res.redirect(`${process.env.CLIENT_URL}/#` + querystring.stringify({ error: 'invalid_token' }));
    }
  }
});

// Refresh token endpoint
router.get('/refresh_token', async (req, res) => {
  const refresh_token = req.query.refresh_token;

  try {
    const response = await axios.post('https://accounts.spotify.com/api/token',
      querystring.stringify({
        grant_type: 'refresh_token',
        refresh_token: refresh_token
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')
        }
      }
    );

    res.json({ access_token: response.data.access_token });
  } catch (error) {
    console.error('Error refreshing token:', error.response?.data || error.message);
    res.status(400).json({ error: 'Failed to refresh token' });
  }
});

module.exports = router;

