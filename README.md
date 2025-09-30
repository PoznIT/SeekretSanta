# SeekretSanta - Secret Santa Web Application

A modern Secret Santa web application built with Java Spring Boot, Next.js, and PostgreSQL.

## Features

- **User Authentication**: Register and login with email/password
- **Event Management**: Create and manage Secret Santa events (called "Seekrets")
- **Participant Management**: Add participants with names and emails
- **Constraint System**: Define who cannot give gifts to whom
- **Assignment Generation**: Automatically generate valid gift assignments
- **Unique Links**: Share events via unique, shareable links
- **Responsive UI**: Works on desktop and mobile devices

## Architecture

- **Backend**: Java Spring Boot REST API
- **Frontend**: Next.js (React) with TypeScript
- **Database**: PostgreSQL with Flyway migrations
- **Authentication**: JWT tokens
- **Deployment**: Fully dockerized with docker-compose

## Quick Start

### Prerequisites

- Docker and Docker Compose installed
- Git

### Installation

1. Clone or extract the project:
   ```bash
   cd seekretsanta
   ```

2. Start all services:
   ```bash
   docker-compose up -d
   ```

3. Wait for all services to start (about 1-2 minutes), then access:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080/api

### First Use

1. Go to http://localhost:3000
2. Register a new account
3. Create your first Seekret event
4. Add participants and constraints
5. Generate assignments
6. Share the unique link with participants

## Development

### Backend Development

The backend is a Spring Boot application with:

- **Controllers**: REST API endpoints
- **Services**: Business logic
- **Repositories**: JPA data access
- **Models**: Database entities
- **DTOs**: Data transfer objects
- **Security**: JWT authentication with Spring Security

### Frontend Development

The frontend is a Next.js application with:

- **Pages**: Route components
- **Components**: Reusable UI components  
- **Services**: API communication
- **Types**: TypeScript interfaces

### Database

PostgreSQL database with Flyway migrations:

- **Users**: User accounts
- **Seekrets**: Secret Santa events
- **Participants**: Event participants
- **Assignments**: Gift giver/receiver pairs
- **Constraints**: Assignment restrictions

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Seekrets
- `POST /api/seekrets` - Create new Seekret
- `GET /api/seekrets/my` - Get user's Seekrets
- `GET /api/seekrets/view/{link}` - Get Seekret by link (public)
- `POST /api/seekrets/generate/{link}` - Generate assignments

## Configuration

### Environment Variables

Create a `.env` file with:

```env
POSTGRES_DB=seekretsanta
POSTGRES_USER=seekretsanta_user
POSTGRES_PASSWORD=seekretsanta_password
JWT_SECRET=your-secret-key
JWT_EXPIRATION=86400000
```

### Docker Services

- **database**: PostgreSQL 15
- **backend**: Spring Boot API (port 8080)
- **frontend**: Next.js app (port 3000)

## Production Deployment

1. Change JWT secret in production
2. Use environment-specific database credentials
3. Configure HTTPS
4. Set up proper CORS origins
5. Configure email service for notifications (optional)

## Troubleshooting

### Services won't start
- Check if ports 3000, 8080, 5432 are available
- Run `docker-compose logs` to see error messages

### Database connection issues
- Wait for PostgreSQL to fully start (30 seconds)
- Check database credentials in docker-compose.yml

### Frontend can't reach backend
- Ensure backend service is healthy
- Check network configuration in docker-compose

## License

This project is provided as-is for educational purposes.
