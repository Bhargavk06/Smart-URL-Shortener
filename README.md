## Smart URL Shortener 

Smart URL Shortener is a full-stack web application that allows users to generate short links for long URLs.  
Users can optionally provide a custom shortcode and set an expiry time. The application also tracks click analytics such as timestamp, IP address, and referrer, and displays detailed statistics through a dashboard.

## How It Works

1. User enters a long URL in the frontend.
2. Backend generates a unique shortcode (or accepts a custom one).
3. The backend stores the mapping between the shortcode and the original URL.
4. When the short URL is opened, the backend redirects the user to the original URL.
5. Each redirect is logged for analytics and shown in the statistics page.

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
``` bash
git clone https://github.com/Bhargavk06/Smart-URL-Shortener.git
cd Smart-URL-Shortener
```
### 2. Backend Setup (Node.js + Express) 
``` bash
 cd backend  # Move to Backend Folder
 npm install # Install Dependencies
 npm start  # Run Backend Server
```

### 3. Frontend Setup (React + MUI) 
``` bash
cd ../my-url-shortener   # Move to Frontend Folder
npm install              # Install Dependencies
REACT_APP_API_URL=http://localhost:5000 # Create .env File
npm start  # Run Frontend
```

---

## Author

Bhargav Sai  
GitHub: https://github.com/Bhargavk06  
LinkedIn: https://www.linkedin.com/in/bhargavsai06/


