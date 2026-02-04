import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Grid,
  Button,
  Snackbar,
  Alert,
  CircularProgress,
} from '@mui/material';
import { axiosInstance } from './LoggingMiddleware';

export default function ShortenerPage() {
  const [urls, setUrls] = useState([{ originalUrl: '', validity: '', customCode: '' }]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (index, field, value) => {
    const updated = [...urls];
    updated[index][field] = value;
    setUrls(updated);
  };

  const handleAddField = () => {
    if (urls.length < 5) {
      setUrls([...urls, { originalUrl: '', validity: '', customCode: '' }]);
    }
  };

  const validateURL = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async () => {
    setError('');
    setLoading(true);
    const newResults = [];

    for (const entry of urls) {
      const { originalUrl, validity, customCode } = entry;

      if (!validateURL(originalUrl)) {
        setError(`Invalid URL: ${originalUrl}`);
        setLoading(false);
        return;
      }
      if (validity && (isNaN(validity) || parseInt(validity) <= 0)) {
        setError(`Invalid validity for: ${originalUrl}`);
        setLoading(false);
        return;
      }
      if (customCode && !/^[a-zA-Z0-9]+$/.test(customCode)) {
        setError(`Custom code must be alphanumeric for: ${originalUrl}`);
        setLoading(false);
        return;
      }

      try {
        const res = await axiosInstance.post('/shorturls', {
          originalUrl,
          validity: validity ? parseInt(validity) : undefined,
          customCode,
        });

        newResults.push(res.data);

        // Save shortcode for stats page
        const stored = JSON.parse(sessionStorage.getItem('shortenedLinks') || '[]');
        stored.push(res.data.shortcode);
        sessionStorage.setItem('shortenedLinks', JSON.stringify(stored));
      } catch (err) {
        setError(
          err.response?.data?.error || 'Something went wrong, check backend.'
        );
        setLoading(false);
        return;
      }
    }

    setResults(newResults);
    setLoading(false);
  };

  return (
    <Card sx={{ my: 4 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Shorten up to 5 URLs
        </Typography>

        {urls.map((url, index) => (
          <Grid container spacing={2} key={index} sx={{ mb: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Original URL"
                fullWidth
                value={url.originalUrl}
                onChange={(e) => handleChange(index, 'originalUrl', e.target.value)}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <TextField
                label="Validity (mins)"
                fullWidth
                value={url.validity}
                onChange={(e) => handleChange(index, 'validity', e.target.value)}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <TextField
                label="Custom Shortcode"
                fullWidth
                value={url.customCode}
                onChange={(e) => handleChange(index, 'customCode', e.target.value)}
              />
            </Grid>
          </Grid>
        ))}

        <Button onClick={handleAddField} disabled={urls.length >= 5} sx={{ mr: 2 }}>
          Add Another
        </Button>

        <Button variant="contained" onClick={handleSubmit} disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Shorten'}
        </Button>

        <div style={{ marginTop: 20 }}>
          {results.map((result, idx) => (
            <Card key={idx} sx={{ p: 2, my: 1 }}>
              <Typography>Original: {result.originalUrl}</Typography>
              <Typography>
                Short URL: <a href={result.shortUrl}>{result.shortUrl}</a>
              </Typography>
              <Typography>Expires: {result.expiry}</Typography>
            </Card>
          ))}
        </div>

        <Snackbar open={!!error} autoHideDuration={5000} onClose={() => setError('')}>
          <Alert severity="error">{error}</Alert>
        </Snackbar>
      </CardContent>
    </Card>
  );
}
