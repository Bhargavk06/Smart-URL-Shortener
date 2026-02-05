## Smart URL Shortener 

A full-stack application built using **React + Material UI** for the frontend and **Node.js + Express** for the backend.  
It supports generating short URLs with custom shortcodes, expiry time, redirection, and click analytics.

---

## Live Demo

- **Frontend (Vercel):** https://smart-url-shortener.vercel.app/
- **Backend (Render):** https://smart-url-shortener-oe5f.onrender.com


---

## Features

Shorten up to **5 URLs** at once  
- Custom shortcode support (example: `/bhargav`)  
- URL validity / expiry support (in minutes)  
- Redirects short URLs to the original URL  
- Click tracking (timestamp, referrer, IP)  
- Statistics page to view analytics  
- Environment-based deployment support (no localhost issues)

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
```

---

## Installation & Setup (Local Development) 
### 1. Clone Reposiotry 
git clone https://github.com/Bhargavk06/Smart-URL-Shortener.git
cd Smart-URL-Shortener

### 2. Backend Setup (Node.js + Express) 
 cd backend  # Move to Backend Folder
 npm install # Install Dependencies
 npm start  # Run Backend Server

### 3. Frontend Setup (React + MUI) 
cd ../my-url-shortener   # Move to Frontend Folder
npm install              # Install Dependencies
REACT_APP_API_URL=http://localhost:5000 # Create .env File
npm start  # Run Frontend


### Author
Bhargav Sai
Github: https://github.com/Bhargavk06


