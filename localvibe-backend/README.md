# LocalVibe Backend API

> **Phase 1: Project Setup & Core Backend** — A location-based marketing platform for India.

## Overview

LocalVibe is a location-based marketing platform designed for the Indian market, connecting users with local businesses, services, and professionals. This repository contains the backend API server built with Node.js, Express.js, and TypeScript.

## Tech Stack

| Technology       | Purpose                          |
|------------------|----------------------------------|
| Node.js          | Runtime environment              |
| Express.js       | Web framework                    |
| TypeScript       | Type-safe JavaScript             |
| Drizzle ORM      | Database ORM & migrations        |
| MySQL            | Relational database              |
| JWT              | Authentication (access + refresh)|
| bcrypt           | Password hashing                 |
| Zod              | Request validation               |
| Helmet           | Security headers                 |
| Morgan           | HTTP request logging             |

## Project Structure

```
localvibe-backend/
├── src/
│   ├── config/          # Environment & database configuration
│   ├── controllers/     # Route handler logic
│   ├── db/              # Database schema, migrations, seeds
│   ├── middleware/       # Auth, error handling, validation, rate limiting
│   ├── models/          # (Reserved for future model logic)
│   ├── routes/          # API route definitions
│   ├── services/        # Business logic (JWT, password hashing)
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Helpers, validators, error classes
│   ├── app.ts           # Express app configuration
│   └── server.ts        # Server entry point
├── drizzle.config.ts    # Drizzle ORM configuration
├── tsconfig.json        # TypeScript configuration
├── package.json         # Dependencies & scripts
├── .env.example         # Environment variable template
└── README.md            # This file
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- MySQL 8.0+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/sunilbittu913/riders-admin-ui.git
cd riders-admin-ui
git checkout localvibe-backend
cd localvibe-backend

# Install dependencies
npm install

# Copy environment file and configure
cp .env.example .env
# Edit .env with your database credentials and JWT secrets
```

### Database Setup

```bash
# Create the MySQL database
mysql -u root -p -e "CREATE DATABASE localvibe;"

# Generate migrations
npm run db:generate

# Run migrations
npm run db:migrate

# (Optional) Push schema directly to database
npm run db:push

# (Optional) Seed with sample data
npx tsx src/db/seed.ts
```

### Running the Server

```bash
# Development mode (with hot reload)
npm run dev

# Production build
npm run build
npm start
```

The server will start at `http://localhost:3000` by default.

## API Endpoints

### Health Check

| Method | Endpoint        | Description              | Auth     |
|--------|-----------------|--------------------------|----------|
| GET    | `/api/health`   | API health status        | Public   |

### Authentication

| Method | Endpoint                   | Description              | Auth     |
|--------|----------------------------|--------------------------|----------|
| POST   | `/api/auth/register`       | Register a new user      | Public   |
| POST   | `/api/auth/login`          | Login with credentials   | Public   |
| POST   | `/api/auth/refresh-token`  | Refresh access token     | Public   |

### Users

| Method | Endpoint          | Description              | Auth         |
|--------|-------------------|--------------------------|--------------|
| GET    | `/api/users/me`   | Get current user profile | Authenticated|
| PUT    | `/api/users/me`   | Update user profile      | Authenticated|

### Businesses

| Method | Endpoint               | Description                    | Auth                    |
|--------|------------------------|--------------------------------|-------------------------|
| GET    | `/api/businesses`      | List businesses with filters   | Public                  |
| GET    | `/api/businesses/:id`  | Get single business            | Public                  |
| POST   | `/api/businesses`      | Create business profile        | Business User / Admin   |
| PUT    | `/api/businesses/:id`  | Update business profile        | Business Owner / Admin  |

### Categories

| Method | Endpoint            | Description              | Auth       |
|--------|---------------------|--------------------------|------------|
| GET    | `/api/categories`   | List all categories      | Public     |
| POST   | `/api/categories`   | Create category          | Admin only |

## Authentication

The API uses JWT-based authentication with a dual-token strategy:

- **Access Token**: Short-lived (15 minutes), used for API requests
- **Refresh Token**: Long-lived (7 days), used to obtain new access tokens

Include the access token in the `Authorization` header:

```
Authorization: Bearer <access_token>
```

## Role-Based Access Control (RBAC)

| Role          | Description                                    |
|---------------|------------------------------------------------|
| normal_user   | Default role for registered users              |
| business_user | Users who have created a business profile      |
| admin         | Full platform access and management            |

## Database Schema

### Tables

| Table          | Description                                    |
|----------------|------------------------------------------------|
| users          | User accounts and authentication data          |
| businesses     | Business profiles with location data           |
| categories     | Top-level business categories                  |
| subcategories  | Subcategories under each main category         |
| reviews        | User reviews and ratings for businesses        |
| jobs           | Job postings by businesses                     |
| messages       | Chat messages between users and businesses     |
| offers         | Special offers and deals from businesses       |

## Environment Variables

| Variable                | Description                    | Default           |
|-------------------------|--------------------------------|--------------------|
| `NODE_ENV`              | Environment mode               | `development`      |
| `PORT`                  | Server port                    | `3000`             |
| `DB_HOST`               | MySQL host                     | `localhost`        |
| `DB_PORT`               | MySQL port                     | `3306`             |
| `DB_USER`               | MySQL user                     | `root`             |
| `DB_PASSWORD`           | MySQL password                 | -                  |
| `DB_NAME`               | MySQL database name            | `localvibe`        |
| `JWT_ACCESS_SECRET`     | Access token signing secret    | -                  |
| `JWT_REFRESH_SECRET`    | Refresh token signing secret   | -                  |
| `JWT_ACCESS_EXPIRY`     | Access token expiry            | `15m`              |
| `JWT_REFRESH_EXPIRY`    | Refresh token expiry           | `7d`               |
| `CORS_ORIGIN`           | Allowed CORS origins           | `http://localhost:5173` |

## Scripts

| Script            | Description                              |
|-------------------|------------------------------------------|
| `npm run dev`     | Start development server with hot reload |
| `npm run build`   | Compile TypeScript to JavaScript         |
| `npm start`       | Start production server                  |
| `npm run db:generate` | Generate Drizzle migrations          |
| `npm run db:migrate`  | Run database migrations              |
| `npm run db:push`     | Push schema to database              |
| `npm run db:studio`   | Open Drizzle Studio                  |

## License

ISC
