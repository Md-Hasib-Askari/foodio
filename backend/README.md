# Foodio Backend API

A RESTful API backend for the Foodio food ordering application built with NestJS, PostgreSQL, and TypeORM.

## 🚀 Features

- **Authentication & Authorization**: JWT-based authentication with role-based access control (RBAC)
- **User Management**: User registration, profile management, and role assignment
- **Categories**: Manage food categories
- **Menu Items**: Create and manage restaurant menu items
- **Orders**: Order creation and management system
- **Database Migrations**: TypeORM migration support for database versioning
- **Docker Support**: Containerized deployment with Docker Compose

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v18 or higher
- **npm**: v8 or higher
- **PostgreSQL**: v16 (or use Docker)
- **Docker & Docker Compose** (optional, for containerized setup)

## 🛠️ Technology Stack

- **Framework**: NestJS 11.x
- **Database**: PostgreSQL 16
- **ORM**: TypeORM 0.3.x
- **Authentication**: JWT (@nestjs/jwt)
- **Password Hashing**: bcrypt
- **Language**: TypeScript 5.x
- **Testing**: Jest
- **Linting**: ESLint with Prettier

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd foodio/backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the backend directory with the following variables:

```env
# Database Configuration
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USERNAME=foodio_user
POSTGRES_PASSWORD=foodio123
POSTGRES_DATABASE=foodio

# Application Configuration
PORT=3000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your-secret-key-here
JWT_EXPIRATION=1d
```

> **Note**: Replace `your-secret-key-here` with a secure random string for production.

## 🐳 Docker Setup (Recommended)

### Start with Docker Compose

The project includes PostgreSQL and pgAdmin services configured in Docker Compose:

```bash
# Start PostgreSQL and pgAdmin
docker-compose up -d

# Check running containers
docker-compose ps
```

This will start:
- **PostgreSQL**: Available at `localhost:5432`
- **pgAdmin**: Available at `http://localhost:5050`
  - Email: `admin@foodio.com`
  - Password: `admin123`

### Stop Docker Services

```bash
docker-compose down

# To remove volumes as well
docker-compose down -v
```

## 📦 Database Setup

### Run Migrations

```bash
# Run all pending migrations
npm run migration:run

# Revert the last migration
npm run migration:revert

# Generate a new migration
npm run migration:generate -- src/migrations/MigrationName
```

## 🚀 Running the Application

### Development Mode

```bash
# Start with hot-reload
npm run start:dev
```

The API will be available at `http://localhost:3000`

### Debug Mode

```bash
npm run start:debug
```

### Production Mode

```bash
# Build the application
npm run build

# Start production server
npm run start:prod
```

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run test coverage
npm run test:cov

# Run e2e tests
npm run test:e2e
```

## 📚 API Documentation

The API includes the following main modules:

- **Auth** (`/auth`): Authentication and authorization endpoints
- **Users** (`/users`): User management
- **Categories** (`/categories`): Food category management
- **Menu Items** (`/menu-items`): Menu item management
- **Orders** (`/orders`): Order management

You can test the API endpoints using the provided `api.http` file with REST Client extension in VS Code.

## 🏗️ Project Structure

```
backend/
├── src/
│   ├── auth/              # Authentication module
│   │   ├── decorators/    # Custom decorators (roles, etc.)
│   │   ├── dto/           # Data transfer objects
│   │   ├── guards/        # Auth & roles guards
│   │   └── interfaces/    # TypeScript interfaces
│   ├── categories/        # Categories module
│   ├── database/          # Database configuration
│   ├── menu-items/        # Menu items module
│   ├── orders/            # Orders module
│   ├── users/             # Users module
│   ├── migrations/        # Database migrations
│   └── main.ts            # Application entry point
├── test/                  # E2E tests
├── docker-compose.yml     # Docker services configuration
├── Dockerfile             # Docker image build configuration
└── package.json           # Dependencies and scripts
```

## 🔧 Development Scripts

```bash
# Format code
npm run format

# Lint code
npm run lint

# Build application
npm run build
```

## 🐋 Docker Deployment

### Build Docker Image

```bash
docker build -t foodio-backend .
```

### Run Container

```bash
docker run -p 3000:3000 --env-file .env foodio-backend
```

### Use Docker Compose (Full Stack)

Uncomment the `app` service in `docker-compose.yml` and run:

```bash
docker-compose up -d
```

## 🔐 Authentication Flow

1. Users register or sign in through `/auth/signin`
2. Server returns JWT token
3. Include token in Authorization header: `Bearer <token>`
4. Protected routes validate token and check user roles

## 📝 Migration Workflow

1. Make changes to entity files
2. Generate migration: `npm run migration:generate -- src/migrations/DescriptionOfChange`
3. Review the generated migration file
4. Run migration: `npm run migration:run`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m 'Add some feature'`
4. Push to branch: `git push origin feature/your-feature`
5. Submit a pull request

## 📄 License

This project is licensed under UNLICENSED.

## 👥 Author

- Md Hasib Askari - [GitHub](https://github.com/Md-Hasib-Askari)

## 🐛 Troubleshooting

### Database Connection Issues

- Verify PostgreSQL is running: `docker-compose ps`
- Check environment variables in `.env`
- Ensure database credentials match `docker-compose.yml`

### Port Already in Use

```bash
# Check what's using port 3000
netstat -ano | findstr :3000

# Kill the process or change PORT in .env
```

### Migration Errors

```bash
# Revert last migration
npm run migration:revert

# Check database connection
# Verify entity decorators are correct
```
