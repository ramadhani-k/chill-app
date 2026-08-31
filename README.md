# CHILL - Movie Streaming Web Application & Backend API

A fullstack application featuring a React frontend (styled with Tailwind CSS and Zustand state management) and a Node.js + Express backend REST API connected to a PostgreSQL database.

## Features

### Backend REST API
- **Database Connection & Initialization**: PostgreSQL database integration using `pg.Pool` with auto table creation (`users`, `movies`).
- **Authentication & Verification**:
  - `POST /register`: User registration with bcrypt password hashing and Nodemailer email verification token link.
  - `GET /verify-email`: Verification token check to set `is_verified = true`.
  - `POST /login`: User login returning JWT token for verified users.
  - `verifyToken` middleware: Protects API routes via `Authorization: Bearer <token>`.
- **Dynamic Movie Queries**:
  - `GET /movies`: Dynamic SQL query params filtering (`genre`), search (`search`), sorting (`sortBy`), and pagination (`page`, `limit`). Example: `/movies?genre=Action&search=inception&sortBy=title:asc&page=1&limit=10`.
  - `GET /movie/:id`: Retrieve a specific movie by ID.
  - `POST /movie`: Add a new movie.
  - `PATCH /movie/:id`: Update existing movie details.
  - `DELETE /movie/:id`: Delete a movie by ID.
- **File Upload**:
  - `POST /upload`: Form-data image upload using Multer stored under `upload/` directory returning filename and relative path.

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
JWT_SECRET=secret_key_movie_app
SMTP_HOST=smtp.ethereal.email
SMTP_PORT=587
SMTP_USER=test@example.com
SMTP_PASS=testpass
BASE_URL=http://localhost:5000
```

---

## Database Setup

To set up the PostgreSQL database manually:

```sql
CREATE DATABASE movie_db;

\c movie_db;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    fullname VARCHAR(255),
    username VARCHAR(100) UNIQUE,
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    verification_token VARCHAR(255),
    is_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE movies (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    badge VARCHAR(100),
    genre VARCHAR(100),
    rating NUMERIC(3, 1),
    description TEXT,
    image VARCHAR(255),
    duration VARCHAR(50),
    release_year INT,
    isInteractive BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Project Structure

```
.
├── db.js                   # PostgreSQL connection pool & table initialization
├── init.sql                # SQL schema initialization script
├── server.js               # Express server entry point & route registration
├── middleware/
│   └── authMiddleware.js   # JWT authentication middleware (verifyToken)
├── routes/
│   ├── authRoutes.js       # Auth endpoints (/register, /verify-email, /login)
│   ├── movieRoutes.js      # Movie CRUD & dynamic query endpoints
│   └── uploadRoutes.js     # Multer file upload endpoint (/upload)
├── services/
│   ├── movieService.js     # Movie DML & dynamic query services
│   └── userService.js      # User DML services
├── upload/                 # Directory storing uploaded media files
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

| Method | Endpoint | Description / Parameters |
|---|---|---|
| `POST` | `/register` | Payload: `{ "fullname": "John Doe", "username": "johndoe", "email": "john@example.com", "password": "password123" }` |
| `GET` | `/verify-email?token=<token>` | Query param: `token` |
| `POST` | `/login` | Payload: `{ "email": "john@example.com", "password": "password123" }` |
| `GET` | `/movies` | Query params: `genre`, `search`, `sortBy`, `page`, `limit` |
| `GET` | `/movie/:id` | Get movie by ID |
| `POST` | `/movie` | Payload: `{ "title": "Inception", "genre": "Action" }` |
| `PATCH` | `/movie/:id` | Payload: `{ "title": "Inception Updated" }` |
| `DELETE` | `/movie/:id` | Delete movie by ID |
| `POST` | `/upload` | Form-data key: `file` |

---

## Linting & Building

- Run linter: `npm run lint`
- Build frontend: `npm run build`
