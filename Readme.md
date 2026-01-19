# Foodio - Food Ordering Platform

A full-stack food ordering application with a NestJS backend, Next.js frontend, and PostgreSQL database. The platform features user authentication, admin panel, menu management, and order processing.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Detailed Setup](#detailed-setup)
- [Running the Application](#running-the-application)
- [Docker Deployment](#docker-deployment)
- [API Documentation](#api-documentation)
- [Environment Variables](#environment-variables)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

## Overview

Foodio is a modern food ordering platform that allows users to browse menus, place orders, and track their order status. Administrators can manage categories, menu items, and process orders through an intuitive admin panel.

### Key Capabilities

- **User Portal**: Browse menu, place orders, track order history
- **Admin Panel**: Complete restaurant management system
- **Real-time Updates**: Order status tracking and notifications
- **Secure Authentication**: JWT-based auth with role-based access control
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS

## Features

### User Features
- User registration and authentication
- Browse food menu by categories (Starters, Main Course, Desserts, etc.)
- Add items to cart and place orders
- View order history and track order status
- Update profile and manage account

### Admin Features
- Admin authentication and dashboard
- Category management (Create, Read, Update, Delete)
- Menu item management with image support
- Order management and status updates
- User role management
- Real-time order monitoring

## Technology Stack

### Backend
- **Framework**: NestJS 11.x
- **Database**: PostgreSQL 16
- **ORM**: TypeORM 0.3.x
- **Authentication**: JWT with bcrypt
- **Language**: TypeScript 5.x
- **Testing**: Jest

### Frontend
- **Framework**: Next.js 16.1.1 (App Router)
- **React**: 19.2.3
- **Styling**: Tailwind CSS 4
- **Form Management**: Formik + Yup
- **HTTP Client**: Axios
- **UI**: React Icons, React Toastify
- **Language**: TypeScript 5.x

### DevOps
- **Containerization**: Docker & Docker Compose
- **Database Admin**: pgAdmin 4
- **Version Control**: Git

## Prerequisites

Before you begin, ensure you have the following installed:

### Required
- **Bun**: v1.0 or higher ([Download](https://bun.sh/))
- **PostgreSQL**: v16 ([Download](https://www.postgresql.org/download/))
  - OR use Docker (recommended)

### Optional but Recommended
- **Docker Desktop**: For containerized setup ([Download](https://www.docker.com/products/docker-desktop))
- **Git**: For version control ([Download](https://git-scm.com/))
- **VS Code**: Recommended IDE with REST Client extension

## Quick Start

Get up and running in less than 5 minutes:

```bash
# 1. Clone the repository
git clone https://github.com/Md-Hasib-Askari/foodio.git
cd foodio

# 2. Start PostgreSQL with Docker
cd backend
docker-compose up -d postgres

# 3. Install backend dependencies
bun install

# 4. Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# 5. Run database migrations
bun run migration:generate -- src/database/migrations/InitMigration
bun run migration:run

# 6. Start backend server
bun run start:dev

# 7. In a new terminal, set up frontend
cd ../frontend
bun install

# 8. Set up frontend environment
cp .env.example .env
# Edit .env with your configuration

# 9. Start frontend server
bun run dev
```

**You're ready!**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5555
- pgAdmin: http://localhost:5050

*You can now register as a user or admin and start using Foodio!*

### Restore Pre-Populated Database (Optional)

- Use **foodio-backup** file to restore a pre-populated database in **pgAdmin**.

## Project Structure

```
foodio/
├── backend/                    # NestJS Backend API
│   ├── src/
│   │   ├── auth/              # Authentication & JWT
│   │   ├── users/             # User management
│   │   ├── categories/        # Category CRUD
│   │   ├── menu-items/        # Menu items management
│   │   ├── orders/            # Order processing
│   │   ├── common/            # Shared utilities
│   │   │   ├── decorators/    # Custom decorators
│   │   │   ├── enums/         # Enums (roles, order status)
│   │   │   └── validators/    # Custom validators
│   │   ├── database/          # DB config & migrations
│   │   └── main.ts            # App entry point
│   ├── test/                  # E2E tests
│   ├── docker-compose.yml     # Docker services
│   ├── Dockerfile             # Backend container image
│   ├── .env                   # Backend environment vars
│   └── package.json
│
└── frontend/                   # Next.js Frontend
    ├── app/                    # Next.js App Router
    │   ├── page.tsx           # Landing page
    │   ├── admin/             # Admin routes
    │   ├── auth/              # Auth pages
    │   ├── food-menu/         # Menu browsing
    │   └── my-orders/         # User orders
    ├── components/
    │   ├── layout/
    │   │   ├── admin-sections/    # Admin components
    │   │   ├── public-sections/   # Public components
    │   │   └── user-sections/     # User components
    │   ├── shared/            # Shared components
    │   └── ui/                # UI components
    ├── api/                   # API integration layer
    ├── context/               # React Context (Auth)
    ├── types/                 # TypeScript types
    ├── validators/            # Form validations
    ├── constants/             # App constants
    ├── .env                   # Frontend environment vars
    └── package.json
```

## Detailed Setup

### Backend Setup

#### 1. Navigate to Backend Directory
```bash
cd backend
```

#### 2. Install Dependencies
```bash
bun install
```

#### 3. Configure Environment Variables

Create `.env` file in the `backend` directory:

```env
# Database Configuration
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USERNAME=foodio_user
POSTGRES_PASSWORD=foodio123
POSTGRES_DATABASE=foodio

# Application Configuration
PORT=5555
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRATION=1d
```

#### 4. Start PostgreSQL

**Option A: Using Docker (Recommended)**
```bash
docker-compose up -d postgres
```

**Option B: Local PostgreSQL**
- Ensure PostgreSQL is running
- Create database: `CREATE DATABASE foodio;`
- Create user with appropriate permissions

#### 5. Run Database Migrations
```bash
bun run migration:run
```

#### 6. Start Backend Server
```bash
# Development mode with hot-reload
bun run start:dev

# Production mode
bun run build
bun run start:prod
```

Backend will be available at: `http://localhost:5555`

### Frontend Setup

#### 1. Navigate to Frontend Directory
```bash
cd frontend
```

#### 2. Install Dependencies
```bash
bun install
```

#### 3. Configure Environment Variables

Create `.env` file in the `frontend` directory:

```env
# Frontend Port (optional, defaults to 3000)
NEXT_PUBLIC_PORT=3000

# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:5555/api/v1/
```

#### 4. Start Frontend Server
```bash
# Development mode
bun run dev

# Production mode
bun run build
bun start
```

Frontend will be available at: `http://localhost:3000`

## Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
bun run start:dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
bun run dev
```

### Production Mode

**Backend:**
```bash
cd backend
bun run build
bun run start:prod
```

**Frontend:**
```bash
cd frontend
bun run build
bun start
```

### Access Points

| Service | URL | Description |
|---------|-----|-------------|
| Frontend | http://localhost:3000 | User interface |
| Backend API | http://localhost:5555 | REST API |
| pgAdmin | http://localhost:5050 | Database admin (Docker) |
| API Docs | See `backend/API.md` | Endpoint documentation |

## Docker Deployment

### Full Stack with Docker

#### 1. Start All Services
```bash
cd backend
docker-compose up -d
```

This starts:
- PostgreSQL database on port 5432
- pgAdmin on port 5050

#### 2. Access pgAdmin
- URL: http://localhost:5050
- Email: `admin@foodio.com`
- Password: `admin123`

#### 3. Connect to Database in pgAdmin
- Host: `postgres` (or `localhost` from host machine)
- Port: `5432`
- Username: `foodio_user`
- Password: `foodio123`
- Database: `foodio`

#### 4. Stop Services
```bash
docker-compose down

# Remove volumes (deletes all data)
docker-compose down -v
```

### Building Custom Docker Images

```bash
# Build backend image
cd backend
docker build -t foodio-backend .

# Build frontend image
cd frontend
docker build -t foodio-frontend .
```

## API Documentation

### Base URL
```
http://localhost:5555/api/v1
```

### Main Endpoints

#### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/admin/login` - Admin login
- `POST /auth/logout` - Logout
- `PUT /auth/change-password` - Change password
- `PUT /auth/change-role` - Change user role (admin only)

#### Users
- `GET /users` - Get all users (admin only)
- `GET /users/:id` - Get user by ID
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user (admin only)

#### Categories
- `GET /categories` - Get all categories
- `GET /categories/:id` - Get category by ID
- `POST /categories` - Create category (admin only)
- `PUT /categories/:id` - Update category (admin only)
- `DELETE /categories/:id` - Delete category (admin only)

#### Menu Items
- `GET /menu-items` - Get all menu items
- `GET /menu-items/:id` - Get menu item by ID
- `GET /menu-items/category/:categoryId` - Get items by category
- `POST /menu-items` - Create menu item (admin only)
- `PUT /menu-items/:id` - Update menu item (admin only)
- `DELETE /menu-items/:id` - Delete menu item (admin only)

#### Orders
- `GET /orders` - Get all orders (admin) or user's orders
- `GET /orders/:id` - Get order by ID
- `POST /orders` - Create order
- `PUT /orders/:id` - Update order status (admin only)
- `DELETE /orders/:id` - Cancel order

**Note**: See `backend/api.http` for detailed request examples.

## Environment Variables

### Backend Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `POSTGRES_HOST` | PostgreSQL host | `localhost` | Yes |
| `POSTGRES_PORT` | PostgreSQL port | `5432` | Yes |
| `POSTGRES_USERNAME` | Database username | `foodio_user` | Yes |
| `POSTGRES_PASSWORD` | Database password | - | Yes |
| `POSTGRES_DATABASE` | Database name | `foodio` | Yes |
| `PORT` | Backend server port | `5555` | Yes |
| `NODE_ENV` | Environment | `development` | Yes |
| `JWT_SECRET` | JWT signing secret | - | Yes |
| `JWT_EXPIRATION` | Token expiration | `1d` | Yes |

### Frontend Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `NEXT_PUBLIC_PORT` | Frontend port | `3000` | No |
| `NEXT_PUBLIC_API_URL` | Backend API URL | `http://localhost:5555/api/v1/` | Yes |

**Security Note**: Never commit `.env` files to version control. Use `.env.example` as a template.

## Troubleshooting

### Common Issues

#### Port Already in Use

**Backend:**
```bash
# Change PORT in backend/.env
PORT=3001
```

**Frontend:**
```bash
# Run on different port
PORT=3001 bun run dev
```

#### Database Connection Failed

1. **Check PostgreSQL is running:**
```bash
docker-compose ps
# OR
psql -U foodio_user -d foodio -h localhost
```

2. **Verify credentials in `.env`**
3. **Check firewall settings**
4. **Ensure database exists:**
```bash
docker exec -it foodio_db psql -U foodio_user -d postgres -c "CREATE DATABASE foodio;"
```

#### Migration Errors

```bash
# Revert last migration
bun run migration:revert

# Run migrations again
bun run migration:run

# If issues persist, drop and recreate database
docker-compose down -v
docker-compose up -d postgres
bun run migration:run
```

#### Frontend Cannot Connect to Backend

1. **Verify backend is running:**
```bash
curl http://localhost:5555/api/v1/
```

2. **Check `NEXT_PUBLIC_API_URL` in frontend/.env**
3. **Clear browser cache and localStorage**
4. **Check CORS settings in backend**

#### Module Not Found Errors

```bash
# Backend
cd backend
rm -rf node_modules bun.lockb
bun install

# Frontend
cd frontend
rm -rf node_modules .next bun.lockb
bun install
```

#### Docker Issues

```bash
# Restart Docker services
docker-compose restart

# View logs
docker-compose logs -f

# Clean rebuild
docker-compose down -v
docker-compose up -d --build
```

## Testing

### Backend Tests

```bash
cd backend

# Unit tests
bun run test

# Watch mode
bun run test:watch

# Coverage
bun run test:cov

# E2E tests
bun run test:e2e
```

### Frontend Tests

```bash
cd frontend

# Run linter
bun run lint
```

## Development Scripts

### Backend Scripts

| Script | Description |
|--------|-------------|
| `bun run start:dev` | Start development server with hot-reload |
| `bun run start:debug` | Start in debug mode |
| `bun run build` | Build for production |
| `bun run start:prod` | Run production build |
| `bun run migration:generate` | Generate new migration |
| `bun run migration:run` | Run pending migrations |
| `bun run migration:revert` | Revert last migration |
| `bun run lint` | Run ESLint |
| `bun run format` | Format code with Prettier |
| `bun test` | Run unit tests |

### Frontend Scripts

| Script | Description |
|--------|-------------|
| `bun run dev` | Start development server |
| `bun run build` | Build for production |
| `bun start` | Run production build |
| `bun run lint` | Run ESLint |

## User Roles

### Regular User
- **Access**: Public pages, user authentication, menu browsing, order placement
- **Routes**: `/auth/user`, `/food-menu`, `/my-orders`

### Admin
- **Access**: Admin panel, full CRUD operations, order management
- **Routes**: `/auth/admin`, `/admin/panel`
- **Capabilities**: Manage categories, menu items, orders, and users

## Development Workflow

1. **Start backend** (with database)
2. **Run migrations** if needed
3. **Start frontend**
4. **Register/Login** as user or admin
5. **Test features** in both user and admin portals
6. **Check logs** for any issues

### Recommended Development Order

1. Set up database and run migrations
2. Test backend API endpoints using `backend/api.http`
3. Start frontend and test user registration/login
4. Test admin features
5. Test order flow end-to-end

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Follow existing code patterns
- Run linters before committing
- Write meaningful commit messages
- Add tests for new features

## License

This project is licensed under the MIT License.

## Authors
- Md Hasib Askari - [GitHub](https://github.com/Md-Hasib-Askari)

## Acknowledgments

- NestJS team for the amazing framework
- Next.js team for the React framework
- All open-source contributors

---

## Support

For issues, questions, or contributions:
- **Issues**: [GitHub Issues](https://github.com/Md-Hasib-Askari/foodio/issues)

---

**Built with ❤️ using NestJS and Next.js**