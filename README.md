# Booking Hotels

A full stack hotel booking platform built with React, TypeScript, and Node.js/Express. This project was built as a QA engineering learning project — the application is intentionally designed to be tested against, with `data-testid` attributes throughout and a clean REST API.

This repo is mostly for learning and testing purposes along with the test suite in the `restful-booker-tests` repo. 

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
- JSON file storage (swappable for a database)
- CORS enabled for local development

## Features

- Browse available hotel rooms with pricing and descriptions
- Book a room with full form validation (name, email, phone, dates)
- Confirmation page with a unique booking ID
- Admin panel to view and delete bookings
- REST API with GET, POST, and DELETE endpoints

## Getting Started

### Prerequisites

- Node.js v18 or higher
- npm

### Running the Backend

```bash
cd backend
npm install
npm run dev
```

The API will start at `http://localhost:5000`

### Running the Frontend

```bash
cd frontend
npm install
npm run dev
```

The app will start at `http://localhost:5173`

Both servers need to be running simultaneously for the app to work.

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
- **Tier 3 — Edge Cases:** Form validation, invalid inputs, and UI responsiveness

## Known Limitations

- Data is stored in a JSON file rather than a database. This is intentional for simplicity and can be swapped out without changing any routes or tests.
- No authentication on the admin panel (planned for a future iteration)
- No duplicate booking detection across overlapping dates (a known edge case for future tests)

## Future Improvements

- [ ] Swap JSON storage for a PostgreSQL or SQLite database
- [ ] Add admin authentication with JWT
- [ ] Add date conflict detection to prevent double bookings
- [ ] Add Docker support for easier local setup
- [ ] Deploy frontend and backend to a cloud provider