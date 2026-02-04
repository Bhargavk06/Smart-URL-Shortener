import React from 'react';
import { Container, Typography, Divider } from '@mui/material';
import ShortenerPage from './ShortenerPage';
import StatsPage from './StatsPage';

function App() {
  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        URL Shortener Microservice
      </Typography>

      <ShortenerPage />

      <Divider sx={{ my: 4 }} />

      <StatsPage />
    </Container>
  );
}

export default App;
