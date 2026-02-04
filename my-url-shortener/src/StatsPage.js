import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import { axiosInstance } from './LoggingMiddleware';

export default function StatsPage() {
  const [stats, setStats] = useState([]);
  const backendBaseUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const storedLinks = JSON.parse(
      sessionStorage.getItem('shortenedLinks') || '[]'
    );

    const fetchStats = async () => {
      const results = [];
      for (const shortcode of storedLinks) {
        try {
          const res = await axiosInstance.get(`/shorturls/${shortcode}`);
          results.push(res.data);
        } catch (err) {
          console.error(err);
        }
      }
      setStats(results);
    };

    fetchStats();
  }, []);

  return (
    <Card sx={{ p: 3, m: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Short URL Statistics
        </Typography>

        {stats.map((item, idx) => (
          <Card key={idx} sx={{ p: 2, my: 2 }}>
            <CardContent>
              <Typography variant="subtitle1">
                Short URL:{' '}
                <a
                  href={`${backendBaseUrl}/${item.shortcode}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {`${backendBaseUrl}/${item.shortcode}`}
                </a>
              </Typography>

              <Typography>Original URL: {item.originalUrl}</Typography>
              <Typography>Created: {item.createdAt}</Typography>
              <Typography>Expires: {item.expiry}</Typography>
              <Typography>Total Clicks: {item.totalClicks}</Typography>

              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Timestamp</TableCell>
                    <TableCell>Source</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {item.clicks.map((click, i) => (
                    <TableRow key={i}>
                      <TableCell>{click.timestamp}</TableCell>
                      <TableCell>{click.source}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
}
