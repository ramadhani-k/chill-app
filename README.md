# CHILL - Movie Streaming Web Application

A React-based movie application featuring user authentication pages (Login and Register) and an interactive Homepage with movie carousels and details.

## Features

- **Authentication**:
  - Login page with username and password input toggle.
  - Register page with password confirmation toggle.
  - Form submission redirects smoothly to the Homepage (`/beranda`).
- **Homepage (`/beranda`)**:
  - Sticky Navigation Bar with profile dropdown menu.
  - Hero banner with action buttons.
  - Categorized horizontal movie carousels with smooth arrow navigation.
  - Interactive movie hover cards displaying additional details.
- **Responsive Layout**: Designed for both desktop and mobile viewports.

## Prerequisites

Ensure you have Node.js (v18 or higher recommended) and `npm` installed on your system.

## Setup & Installation

1. **Clone the repository** (if not already done):
   ```bash
   git clone <repository-url>
   cd chill-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

## Development

To start the Vite development server locally:

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173` (or the URL provided in the terminal).

## Building for Production

To compile and build the application for production:

```bash
npm run build
```

To preview the built assets locally:

```bash
npm run preview
```

## Linting

To run ESLint check across the codebase:

```bash
npm run lint
```

## Project Structure

```
src/
├── assets/          # Static assets
├── components/
│   ├── atoms/       # Base components (Button, Input, Label, MovieCard)
│   ├── molecules/   # Compound components (DropdownProfile, InputGroup, MovieHoverInfo)
│   └── organisms/   # Complex layout components (HeroBanner, LoginForm, MovieSection, Navbar, RegisterForm)
├── pages/           # Page components (Homepage, Login, Register)
├── App.jsx          # Router & route definitions
├── main.jsx         # Application entry point
├── index.css        # Global CSS & Tailwind styling
└── style-beranda.css# Homepage & carousel styling
```
