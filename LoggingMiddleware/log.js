import axios from 'axios';

// External log API and your Bearer token
const LOG_API = 'http://20.244.56.144/evaluation-service/logs';
const BEARER_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJiaGFyZ2F2c2FpLmswNkBnbWFpbC5jb20iLCJleHAiOjE3NTQwMzQ0ODIsImlhdCI6MTc1NDAzMzU4MiwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjYzYmRjMzliLWQ5ZjEtNGYzMC05MzBmLWVlMzUwYWI5ODdkZCIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImsgYmhhcmdhdiBzYWkiLCJzdWIiOiJhOGI1OGY1NS1iMDBiLTRiN2QtYTljZS1lY2Y2ZmY0ZDE3OTAifSwiZW1haWwiOiJiaGFyZ2F2c2FpLmswNkBnbWFpbC5jb20iLCJuYW1lIjoiayBiaGFyZ2F2IHNhaSIsInJvbGxObyI6IjIyYnExYTEyODUiLCJhY2Nlc3NDb2RlIjoiUG5WQkZWIiwiY2xpZW50SUQiOiJhOGI1OGY1NS1iMDBiLTRiN2QtYTljZS1lY2Y2ZmY0ZDE3OTAiLCJjbGllbnRTZWNyZXQiOiJEZW5TVER6cGRQZ1ZmTWhqIn0.Q6XRS7iuU86nHRN5R8c0VIvCabOrvN4123yG7A0mQMw'; // ← 🔁 Replace with your real Bearer token

// Send logs to the external API
async function logToServer(stack, level, pkg, message) {
  try {
    await fetch(LOG_API, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${BEARER_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        stack,
        level,
        package: pkg,
        message,
      }),
    });
  } catch (err) {
    console.error('[Logging Error]', err.message || err);
  }
}

// Create a custom Axios instance
export const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000', // change if needed
});

// Request interceptor
axiosInstance.interceptors.request.use(
  async (request) => {
    const message = `[Request] ${request.method.toUpperCase()} ${request.url}`;
    console.info(message, request.data || '');
    logToServer('frontend', 'info', 'axios', message); // Don't await here
    return request;
  },
  (error) => {
    const message = `[Request Error] ${error.message}`;
    console.error(message);
    logToServer('frontend', 'error', 'axios', message);
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  async (response) => {
    const message = `[Response] ${response.status} ${response.config.url}`;
    console.info(message, response.data || '');
    logToServer('frontend', 'info', 'axios', message);
    return response;
  },
  (error) => {
    const message = `[Response Error] ${error.message}`;
    console.error(message);
    logToServer('frontend', 'error', 'axios', message);
    return Promise.reject(error);
  }
);
