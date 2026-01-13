# Foodio Frontend

A modern Next.js food ordering application with admin panel and user authentication.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [User Roles](#user-roles)
- [API Integration](#api-integration)

## Features

- **User Features**
  - User registration and authentication
  - Browse food menu by categories
  - Place orders
  - View order history
  - Track order status

- **Admin Features**
  - Admin authentication
  - Manage categories (Add, Edit, Delete)
  - Manage menu items (Add, Edit, Delete)
  - View and manage orders
  - Update order status

## Tech Stack

- **Framework:** Next.js 16.1.1
- **React:** 19.2.3
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Form Management:** Formik + Yup
- **HTTP Client:** Axios
- **Icons:** React Icons
- **Notifications:** React Toastify

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (v18 or higher recommended)
- **npm** or **yarn** or **pnpm**
- **Backend API** running (see backend README for setup)

## Installation

### 1. Clone the repository (if not already done)

```bash
git clone <repository-url>
cd foodio/frontend
```

### 2. Install dependencies

```bash
npm install
```

Or using yarn:

```bash
yarn install
```

Or using pnpm:

```bash
pnpm install
```

## Environment Variables

Create a `.env` file in the `frontend` directory with the following variables:

```env
# Frontend Port (default: 3000, but you can use any port)
NEXT_PUBLIC_PORT=5555

# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:5555/api/v1/
```

### Environment Variables Explanation

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_PORT` | Port number for the frontend application | `5555` |
| `NEXT_PUBLIC_API_URL` | Backend API base URL | `http://localhost:5555/api/v1/` |

**Important Notes:**
- Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser
- Make sure the backend API is running on the URL specified in `NEXT_PUBLIC_API_URL`
- Update the API URL if your backend runs on a different port

## Running the Application

### Development Mode

Start the development server:

```bash
npm run dev
```

The application will be available at:
- Default: `http://localhost:3000`
- Or the port specified in your script/config

### Production Mode

1. Build the application:

```bash
npm run build
```

2. Start the production server:

```bash
npm start
```

## 📁 Project Structure

```
frontend/
├── api/                    # API integration layer
│   ├── axios.config.ts     # Axios instance with interceptors
│   ├── category.api.ts     # Category API calls
│   ├── menu-item.api.ts    # Menu items API calls
│   ├── order.api.ts        # Orders API calls
│   └── user.api.ts         # User/Auth API calls
├── app/                    # Next.js App Router
│   ├── page.tsx            # Landing page
│   ├── layout.tsx          # Root layout
│   ├── globals.css         # Global styles
│   ├── admin/              # Admin routes
│   │   └── panel/          # Admin panel
│   ├── auth/               # Authentication routes
│   │   ├── admin/          # Admin login
│   │   └── user/           # User login/register
│   ├── food-menu/          # Food menu page
│   └── my-orders/          # User orders page
├── components/             # React components
│   ├── icons/              # Icon components
│   ├── layout/             # Layout components
│   │   ├── admin-sections/ # Admin panel components
│   │   ├── public-sections/# Public facing components
│   │   └── user-sections/  # User-specific components
│   ├── shared/             # Shared components
│   └── ui/                 # UI components
├── constants/              # App constants
│   ├── order-status.enum.ts# Order status enums
│   └── routes.ts           # Route definitions
├── context/                # React Context
│   └── AuthContext.tsx     # Authentication context
├── types/                  # TypeScript types
│   └── auth.ts             # Auth-related types
├── validators/             # Form validation schemas
│   ├── add-category-validation.ts
│   ├── add-item-validation.ts
│   ├── admin-login-validation.ts
│   ├── login-validation.ts
│   └── register-validation.ts
├── public/                 # Static assets
│   └── landing-page/       # Landing page images
├── .env                    # Environment variables
├── next.config.ts          # Next.js configuration
├── tsconfig.json           # TypeScript configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── package.json            # Project dependencies
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Starts the development server |
| `npm run build` | Creates an optimized production build |
| `npm start` | Runs the production server |
| `npm run lint` | Runs ESLint to check code quality |

## User Roles

### Regular Users
- **Route:** `/auth/user`
- **Capabilities:**
  - Register new account
  - Login/Logout
  - Browse menu
  - Place orders
  - View order history

### Admin Users
- **Route:** `/auth/admin`
- **Capabilities:**
  - Admin login
  - Manage categories
  - Manage menu items
  - View all orders
  - Update order status

## API Integration

The application uses Axios for API communication. The configuration includes:

- **Base URL:** Set via `NEXT_PUBLIC_API_URL` environment variable
- **Credentials:** Cookies are sent with requests (`withCredentials: true`)
- **Authentication:** JWT tokens stored in localStorage and sent in Authorization header
- **Interceptors:** Automatically adds auth tokens to requests

### API Endpoints Used

- `/auth/*` - Authentication endpoints
- `/categories/*` - Category management
- `/menu-items/*` - Menu items management
- `/orders/*` - Order management
- `/users/*` - User management

## Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Change the port in your terminal
   PORT=3001 npm run dev
   ```

2. **API connection failed**
   - Ensure the backend server is running
   - Verify `NEXT_PUBLIC_API_URL` in `.env` is correct
   - Check backend port matches the URL

3. **Module not found errors**
   ```bash
   # Clear cache and reinstall
   rm -rf node_modules .next
   npm install
   ```

4. **Authentication issues**
   - Clear browser localStorage
   - Clear browser cookies
   - Re-login

## Development Workflow

1. **Start the backend** (see backend README)
2. **Start the frontend** (`npm run dev`)
3. **Access the application** at `http://localhost:3000`
4. **Test user flow:**
   - Register/Login as user
   - Browse menu
   - Place an order
5. **Test admin flow:**
   - Login as admin
   - Manage categories and items
   - Process orders

## Notes

- The application requires the backend API to be running
- Admin credentials should be created via backend seeding or registration
- Images for menu items should be hosted/served by the backend
- All forms use Formik with Yup validation
- Toast notifications appear for user feedback