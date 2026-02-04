import { nanoid } from 'nanoid';

const urlStore = {}; // in-memory DB

export function createShortUrl(originalUrl, customCode, validityMins) {
  const shortcode = customCode || nanoid(6);

  if (urlStore[shortcode]) {
    throw new Error('Shortcode already exists');
  }

  const createdAt = new Date();
  const minutes = Number(validityMins);
  const safeValidity = !minutes || minutes <= 0 ? 30 : minutes;
  const expiresAt = new Date(createdAt.getTime() + safeValidity * 60000);

  urlStore[shortcode] = {
    originalUrl,
    shortcode,
    createdAt: createdAt.toISOString(),
    expiresAt: expiresAt.toISOString(),
    clicks: []
  };

  return urlStore[shortcode];
}

export function getShortUrl(shortcode) {
  return urlStore[shortcode];
}

export function isExpired(entry) {
  return new Date() > new Date(entry.expiresAt);
}

export function logClick(entry, req) {
  entry.clicks.push({
    timestamp: new Date().toISOString(),
    referrer: req.get('referrer') || null,
    ip: req.ip
  });
}
