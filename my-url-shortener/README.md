# URL Shortener Microservice

## 📌 Project Overview

This project is a simple **URL Shortener** built as part of a hiring evaluation.  
It uses a **Node.js + Express backend microservice** and a **React.js frontend**.  
The app lets users shorten long URLs, manage custom shortcodes, track clicks, and see statistics.

---

## ✅ Features

- Shorten up to 5 URLs at once.
- Optional custom shortcode.
- Optional expiry time (defaults to 30 minutes).
- Redirects to original URL.
- Tracks clicks: timestamp, source/referrer.
- Shows statistics per shortened URL.
- Uses **custom Logging Middleware** for all API requests/responses.
- Fully uses **Material UI** for the frontend.

---

## ⚙️ Tech Stack

- **Backend:** Node.js, Express
- **Frontend:** React.js, Material UI
- **Logging:** Custom middleware, no `console.log` used directly.

---

## 🚀 Run Locally

1️⃣ **Install backend dependencies**

```bash
cd backend
npm install
npm start
