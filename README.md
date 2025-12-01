[![CI/CD](https://github.com/PoznIT/SeekretSanta/actions/workflows/action-ci-cd.yml/badge.svg)](https://github.com/PoznIT/SeekretSanta/actions/workflows/action-ci-cd.yml)

# SeekretSanta - Secret Santa Web Application

A modern Secret Santa web application built with Java Spring Boot, Next.js, and PostgreSQL.


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

### Docker Services

- **database**: PostgreSQL 15
- **backend**: Spring Boot API (port 8080)
- **frontend**: Next.js app (port 3000)
