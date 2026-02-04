import express from 'express';
import cors from 'cors';
import { customLogger } from './logger.js';
import {
  createShortUrl,
  getShortUrl,
  isExpired,
  logClick
} from './shortener.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.set('trust proxy', true);
app.use(express.json());
app.use(customLogger);
app.use(cors({ origin: '*' }));

// Create short URL
app.post('/shorturls', (req, res) => {
  const { originalUrl, customCode, validity } = req.body;

  if (!originalUrl) {
    return res.status(400).json({ error: 'Original URL is required' });
  }

  try {
    new URL(originalUrl);
  } catch {
    return res.status(400).json({ error: 'Invalid URL format' });
  }

  let entry;
  try {
    entry = createShortUrl(originalUrl, customCode, validity);
  } catch (err) {
    return res.status(409).json({ error: err.message });
  }

  res.json({
    originalUrl: entry.originalUrl,
    shortcode: entry.shortcode,
    shortPath: `/${entry.shortcode}`,
    expiry: entry.expiresAt
  });
});

// Stats (specific route FIRST)
app.get('/shorturls/:shortcode', (req, res) => {
  const entry = getShortUrl(req.params.shortcode);

  if (!entry) {
    return res.status(404).json({ error: 'Shortcode not found' });
  }

  res.json({
    originalUrl: entry.originalUrl,
    shortcode: entry.shortcode,
    createdAt: entry.createdAt,
    expiry: entry.expiresAt,
    totalClicks: entry.clicks.length,
    clicks: entry.clicks
  });
});

// Redirect (generic route LAST)
app.get('/:shortcode', (req, res) => {
  const entry = getShortUrl(req.params.shortcode);

  if (!entry) {
    return res.status(404).json({ error: 'Shortcode not found' });
  }

  if (isExpired(entry)) {
    return res.status(410).json({ error: 'Link expired' });
  }

  logClick(entry, req);
  res.redirect(302, entry.originalUrl);
});

app.listen(PORT, () => {
  console.info(`URL Shortener running on port ${PORT}`);
});
