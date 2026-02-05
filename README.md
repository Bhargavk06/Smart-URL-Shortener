Smart URL Shortener

A full-stack **Smart URL Shortener** application built using **React + Material UI** for the frontend and **Node.js + Express** for the backend.  
It supports generating short URLs with custom shortcodes, expiry time, redirection, and click analytics.

---

Live Demo

- **Frontend (Vercel):** https://<your-frontend-link>.vercel.app  
- **Backend (Render):** https://<your-backend-link>.onrender.com  

> Replace the above links with your deployed URLs.

---

Features

Shorten up to **5 URLs** at once  
Custom shortcode support (example: `/bhargav`)  
URL validity / expiry support (in minutes)  
Redirects short URLs to the original URL  
Click tracking (timestamp, referrer, IP)  
Statistics page to view analytics  
Environment-based deployment support (no localhost issues)

---

## Tech Stack

### Frontend
- React.js
- Material UI (MUI)
- Axios

### Backend
- Node.js
- Express.js
- Nanoid
- CORS

---

## Project Structure

```bash
Smart-URL-Shortener/
│
├── backend/             # Express Backend
│   ├── index.js
│   ├── shortener.js
│   ├── logger.js
│   └── package.json
│
├── my-url-shortener/    # React Frontend
│   ├── src/
│   ├── public/
│   └── package.json
│
└── README.md
