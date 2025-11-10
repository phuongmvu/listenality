const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const router = express.Router();

const geminiClient = process.env.GEMINI_API_KEY
  ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  : null;

const requireAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'No access token provided' });
  }
  req.token = token;
  next();
};

router.post('/listenality', requireAuth, async (req, res) => {
  if (!geminiClient) {
    return res.status(500).json({ error: 'AI service is not configured' });
  }

  const { timeRangeLabel, tracks, artists, genres, metrics } = req.body || {};

  if (!timeRangeLabel || !Array.isArray(tracks) || !Array.isArray(artists) || !Array.isArray(genres)) {
    return res.status(400).json({ error: 'Missing required listening data' });
  }

  try {
    const topTracks = tracks.slice(0, 5).map(track => ({
      name: track.name,
      artists: (track.artists || []).map(a => a.name),
      popularity: track.popularity
    }));

    const topArtists = artists.slice(0, 5).map(artist => ({
      name: artist.name,
      genres: artist.genres,
      popularity: artist.popularity
    }));

    const genreSummary = genres.slice(0, 5);

    const popularity = metrics?.popularity;
    const era = metrics?.era;
    const diversity = metrics?.diversity;

    const prompt = [
      'You are Listenality AI, an engaging music personality analyst.',
      `Based on the following Spotify listening data for ${timeRangeLabel}, write exactly two short paragraphs.`,
      'Each paragraph must contain exactly two concise sentences.',
      'Paragraph 1: overall vibe and personality highlights.',
      'Paragraph 2: deeper takeaways about artist/genre/era patterns plus a concise suggestion.',
      '',
      'Keep the tone positive, observational, and concise. Do not repeat data verbatim—interpret it.',
      '',
      `Top Tracks: ${JSON.stringify(topTracks)}`,
      `Top Artists: ${JSON.stringify(topArtists)}`,
      `Top Genres: ${JSON.stringify(genreSummary)}`,
      `Popularity Metrics: ${JSON.stringify(popularity)}`,
      `Era Metrics: ${JSON.stringify(era)}`,
      `Diversity Metrics: ${JSON.stringify(diversity)}`
    ].join('\n');

    const modelName = process.env.GEMINI_MODEL || 'gemini-1.5-flash';
    const model = geminiClient.getGenerativeModel({ model: modelName });

    const result = await model.generateContent(prompt);
    const response = result.response;
    const insight = response?.text()?.trim() || '';

    if (!insight) {
      return res.status(502).json({ error: 'AI did not return any insight' });
    }

    return res.json({ insight });
  } catch (error) {
    console.error('Error generating AI insight:', error);
    const status = error?.status || error?.code || 500;
    return res.status(typeof status === 'number' ? status : 500).json({
      error: 'Failed to generate AI insight'
    });
  }
});

module.exports = router;

