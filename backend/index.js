import express from 'express';
import { customLogger } from './logger.js';
import { createShortUrl, getShortUrl, isExpired, logClick } from './shortener.js';
import cors from 'cors'; 
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(customLogger);
app.use(cors());

// Create short URL
app.post('/shorturls', (req, res) => {
  const { originalUrl, customCode, validity } = req.body;

  if (!originalUrl) {
    return res.status(400).json({ error: 'Original URL is required' });
  }

  try {
    const urlObj = new URL(originalUrl); // Validate URL
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
    shortUrl: `http://localhost:${PORT}/${entry.shortcode}`,
    expiry: entry.expiresAt
  });
});

//Redirect
app.get('/:shortcode', (req, res) => {
  const shortcode = req.params.shortcode;
  const entry = getShortUrl(shortcode);

  if (!entry) {
    return res.status(404).json({ error: 'Shortcode not found' });
  }

  if (isExpired(entry)) {
    return res.status(410).json({ error: 'Link expired' });
  }

  logClick(entry, req);

  res.redirect(302, entry.originalUrl);
});

// Stats
app.get('/shorturls/:shortcode', (req, res) => {
  const shortcode = req.params.shortcode;
  const entry = getShortUrl(shortcode);

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

app.listen(PORT, () => {
  console.info(`URL Shortener running at http://localhost:${PORT}`);
});
