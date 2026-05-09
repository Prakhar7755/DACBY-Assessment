# Hacker News Stories App

A full-stack MERN application that scrapes the top stories from Hacker News, stores them in MongoDB, and allows authenticated users to bookmark stories.

---

## Features

### Web Scraper

- Scrapes top 10 stories from Hacker News
- Extracts:
  - Title
  - URL
  - Points
  - Author
  - Posted Time
- Stores scraped data in MongoDB
- Automatically runs when server starts
- Can also be triggered manually via API

### Authentication

- User registration
- User login
- JWT-based authentication using HTTP-only cookies

### Stories

- Fetch all stories sorted by points
- Fetch a single story
- Bookmark/unbookmark stories

### Frontend

- Login & Register pages
- Protected Bookmarks page
- Story listing UI
- Bookmark functionality
- Authentication state management using React Context API

---

# Tech Stack

## Frontend

- React
- React Router DOM
- Axios
- Tailwind CSS

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs
- Cheerio
- Axios

---

# Project Structure

```txt
backend/
client/
```

---

# Backend Structure

```txt
backend/src/
│
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── services/
├── utils/
└── server.js
```

---

# Frontend Structure

```txt
client/src/
│
├── api/
├── components/
├── context/
├── pages/
├── App.jsx
└── main.jsx
```

---

# Environment Variables

Create a `.env` file inside the `backend/` directory:

```env
PORT=5001

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

CORS_ORIGIN=http://localhost:5173
```

---

# Installation & Setup

## 1. Clone Repository

```bash
git clone https://github.com/Prakhar7755/DACBY-Assessment.git
```

---

# Backend Setup

## 1. Navigate to backend

```bash
cd backend
```

## 2. Install dependencies

```bash
npm install
```

## 3. Start backend server

```bash
npm run dev
```

Backend runs on:

```txt
http://localhost:5001
```

---

# Frontend Setup

## 1. Navigate to client

```bash
cd client
```

## 2. Install dependencies

```bash
npm install
```

## 3. Start frontend server

```bash
npm run dev
```

Frontend runs on:

```txt
http://localhost:5173
```

---

# API Endpoints

## Authentication

### Register User

```http
POST /api/auth/register
```

### Login User

```http
POST /api/auth/login
```

---

# Stories

### Get All Stories

```http
GET /api/stories
```

### Get Single Story

```http
GET /api/stories/:id
```

### Toggle Bookmark

```http
POST /api/stories/:id/bookmark
```

Authentication required.

---

# Scraper

### Trigger Scraper Manually

```http
POST /api/scrape
```

---

# Authentication Flow

- JWT token is generated on login/register
- Token is stored in HTTP-only cookies
- Protected routes verify JWT before allowing access

---

# Future Improvements

- Pagination support
- Search functionality
- Story categories
- Better UI/UX improvements
- Refresh tokens
- Unit/integration tests

---

# Deployment

- Render : <https://dacby-assessment.onrender.com>

---

# Author

Built as part of a Full Stack MERN Assignment.
