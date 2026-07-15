# Booking Hotels

A full stack hotel booking platform built with React, TypeScript, and Node.js/Express. This project was built as a QA engineering learning project — the application is intentionally designed to be tested against, with `data-testid` attributes throughout and a clean REST API.

## Live Demo

| Service | URL |
|---|---|
| Frontend | https://hotel-booking-silk-omega.vercel.app |
| Backend API | https://hotel-booker-backend.onrender.com/api/rooms |

> **Note:** The backend is hosted on Render's free tier which spins down after periods of inactivity. The first request after idle may take 30-60 seconds to respond while the server wakes up. Subsequent requests will be fast. The frontend on Vercel is always available instantly.

## Project Structure

This project is split across two repositories:

| Repository | Description |
|---|---|
| `booking-hotels` | The full stack application (this repo) |
| `restful-booker-tests` | The Playwright/TypeScript test suite |

## Tech Stack

**Frontend**
- React 18 with TypeScript
- Vite (build tool and dev server)
- React Router (client-side routing)
- Axios (HTTP requests)

**Backend**
- Node.js with TypeScript
- Express (REST API framework)
- PostgreSQL (database with foreign keys and check constraints)
- CORS enabled for local development

## Features

- Browse available hotel rooms with pricing and descriptions
- Book a room with full form validation (name, email, phone, dates)
- Confirmation page with a unique booking ID
- Admin panel to view and delete bookings
- REST API with GET, POST, and DELETE endpoints
- Three layer validation — React frontend, Express backend, PostgreSQL constraints
- JWT authenticated admin panel with login/logout
- Bcrypt password hashing
- Protected API endpoints with Bearer token authorization

## Getting Started

### Prerequisites

- Node.js v18 or higher
- npm
- PostgreSQL

### Setting up the Database

Run the seed file against your PostgreSQL database:

```bash
psql -U postgres -d hotel_booker -f seed.sql
```

Or against a remote database:

```bash
psql "your-database-url" -f seed.sql
```

### Running the Backend

```bash
cd backend
npm install
npm run dev
```

Create a `.env` file in the `backend` folder using `.env.example` as a template. The API will start at `http://localhost:5000`.

### Running the Frontend

```bash
cd frontend
npm install
npm run dev
```

The app will start at `http://localhost:5173`. Both servers need to be running simultaneously.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/rooms` | Returns all available rooms |
| GET | `/api/bookings` | Returns all bookings |
| POST | `/api/bookings` | Creates a new booking |
| DELETE | `/api/bookings/:id` | Deletes a booking by ID |

### POST /api/bookings

Required fields:

```json
{
  "firstname": "John",
  "lastname": "Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "checkin": "2026-07-01",
  "checkout": "2026-07-05",
  "roomID": 1
}
```

Returns `400` if any field is missing or invalid.
Returns `201` with the created booking on success.

## Testing

This application was built with testability in mind. All interactive elements include `data-testid` attributes for reliable test selectors.

The companion test suite (`restful-booker-tests`) covers:

- **Tier 1 — UI Flows:** End to end booking journey using Playwright and the Page Object Model
- **Tier 2 — API Testing:** Direct REST API tests using Playwright's request utilities
- **Tier 3 — Edge Cases:** Form validation, invalid inputs, and database constraint testing

## Known Limitations

- No duplicate booking detection across overlapping dates
- Backend hosted on Render's free tier — cold starts may cause a 30-60 second delay on first load

## Future Improvements

- [ ] Add admin authentication with JWT
- [ ] Add date conflict detection to prevent double bookings
- [ ] Add Docker support for easier local setup
- [ ] Update GitHub Actions to run tests against live deployed URLs