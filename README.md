# CHILL - Movie Streaming Web Application & Backend API

A fullstack application featuring a React frontend (styled with Tailwind CSS and Zustand state management) and a Node.js + Express backend REST API connected to a PostgreSQL database.

## Features

### Backend REST API
- **Database Connection**: PostgreSQL database integration using `pg.Pool` configured via `.env`.
- **DML Services**: Clean architecture service functions (`getAllMovies`, `getMovieById`, `createMovie`, `updateMovie`, `deleteMovie`).
- **REST Endpoints**:
  - `GET /movies` - Retrieve all movies.
  - `GET /movie/:id` - Retrieve a specific movie by ID.
  - `POST /movie` - Add a new movie.
  - `PATCH /movie/:id` - Update existing movie details.
  - `DELETE /movie/:id` - Delete a movie by ID.
- Ready for testing via Postman or HTTP client.

### Frontend Application
- **Authentication**:
  - Login page with username and password input toggle.
  - Register page with password confirmation toggle.
- **Homepage (`/beranda`)**:
  - Navigation bar with user profile dropdown.
  - Hero banner and categorized movie carousels.
- **Movie Management / CRUD Page (`/crud`)**:
  - State management powered by **Zustand** (`src/store/useMovieStore.js`).
  - Create, Read, Update, and Delete movie entries.

---

## Environment Variables Configuration (`.env`)

Create a `.env` file in the root directory (refer to `.env.example`):

```env
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=movie_db
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/movie_db
VITE_API_URL=http://localhost:5000
```

---

## Database Setup

To set up the PostgreSQL database manually:

```sql
CREATE DATABASE movie_db;

\c movie_db;

CREATE TABLE movies (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    genre VARCHAR(100),
    rating NUMERIC(3, 1),
    description TEXT,
    image VARCHAR(255),
    duration VARCHAR(50),
    release_year INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Project Structure

```
.
├── db.js                   # PostgreSQL database connection pool configuration
├── server.js               # Express server entry point & middleware setup
├── routes/
│   └── movieRoutes.js      # REST API route handlers
├── services/
│   └── movieService.js     # Database DML query service functions
├── src/                    # Frontend React application codebase
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── store/
├── .env                    # Environment variables file
├── .env.example            # Environment variables example template
└── README.md
```

---

## Running the Application

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Backend Server
To start the Node.js Express server:
```bash
node server.js
```
The server will run at `http://localhost:5000`.

### 3. Start Frontend App
To run the Vite development server:
```bash
npm run dev
```

---

## API Endpoints Testing with Postman

| Method | Endpoint | Request Body Example / Notes |
|---|---|---|
| `GET` | `/movies` | - |
| `GET` | `/movie/:id` | - |
| `POST` | `/movie` | `{ "title": "Inception", "genre": "Sci-Fi", "rating": 8.8 }` |
| `PATCH` | `/movie/:id` | `{ "title": "Inception Updated", "genre": "Action" }` |
| `DELETE` | `/movie/:id` | - |

---

## Linting & Building

- Run linter: `npm run lint`
- Build frontend: `npm run build`
