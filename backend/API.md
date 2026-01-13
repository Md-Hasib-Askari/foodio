# Foodio API Documentation

## Base URL
```
http://localhost:3000
```

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the `Authorization` header:

```
Authorization: Bearer <your_token>
```

### User Roles
- **USER**: Regular users who can place orders and manage their profile
- **ADMIN**: Administrators with full access to all resources

---

## Endpoints

### Health Check

#### Check API Health
```http
GET /health
```

Check if the API is running and healthy.

**Response:**
- `200 OK`: API is healthy

---

## Auth

### Register

```http
POST /auth/register
Content-Type: application/json
```

Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password1": "SecureP@ssw0rd!123",
  "password2": "SecureP@ssw0rd!123",
  "fullName": "John Doe",
  "address": "123 Uttara, Dhaka, Bangladesh"
}
```

**Fields:**
- `email` (string, required): User's email address
- `password1` (string, required): Password
- `password2` (string, required): Password confirmation (must match password1)
- `fullName` (string, required): User's full name

**Response:**
- `201 Created`: User successfully registered

---

### Login

```http
POST /auth/login
Content-Type: application/json
```

Authenticate a user and receive a JWT token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecureP@ssw0rd!123"
}
```

**Fields:**
- `email` (string, required): User's email address
- `password` (string, required): User's password

**Response:**
- `200 OK`: Returns JWT token
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### Change Password

```http
POST /auth/change-password
Content-Type: application/json
Authorization: Bearer <token>
```

Change the current user's password.

**Request Body:**
```json
{
  "currentPassword": "SecureP@ssw0rd!123",
  "newPassword1": "NewSecure@ssw0rd!123",
  "newPassword2": "NewSecure@ssw0rd!123"
}
```

**Fields:**
- `currentPassword` (string, required): Current password
- `newPassword1` (string, required): New password
- `newPassword2` (string, required): New password confirmation (must match newPassword1)

**Response:**
- `200 OK`: Password successfully changed

**Authentication:** Required (USER or ADMIN)

---

### Get Profile

```http
GET /auth/profile
Authorization: Bearer <token>
```

Get the authenticated user's profile information.

**Response:**
- `200 OK`: Returns user profile
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "fullName": "John Doe",
  "role": "USER"
}
```

**Authentication:** Required (USER or ADMIN)

---

## Users

### Get All Users

```http
GET /users
Authorization: Bearer <admin_token>
```

Retrieve all users in the system.

**Response:**
- `200 OK`: Returns array of users

**Authentication:** Required (ADMIN only)

---

### Get User By ID

```http
GET /users/:userId
Authorization: Bearer <admin_token>
```

Retrieve a specific user by ID.

**Path Parameters:**
- `userId` (string): User's UUID

**Response:**
- `200 OK`: Returns user details
- `404 Not Found`: User not found

**Authentication:** Required (ADMIN only)

---

### Update User

```http
PATCH /users/:userId
Content-Type: application/json
Authorization: Bearer <admin_token>
```

Update a user's information.

**Path Parameters:**
- `userId` (string): User's UUID

**Request Body:**
```json
{
  "fullName": "Jane Smith",
  "email": "jane@example.com"
}
```

**Fields:**
- `fullName` (string, optional): Updated full name
- `email` (string, optional): Updated email address

**Response:**
- `200 OK`: User successfully updated
- `404 Not Found`: User not found

**Authentication:** Required (ADMIN only)

---

### Delete User

```http
DELETE /users/:userId
Authorization: Bearer <admin_token>
```

Delete a user from the system.

**Path Parameters:**
- `userId` (string): User's UUID

**Response:**
- `200 OK`: User successfully deleted
- `404 Not Found`: User not found

**Authentication:** Required (ADMIN only)

---

## Categories

### Create Category

```http
POST /categories
Content-Type: application/json
Authorization: Bearer <admin_token>
```

Create a new food category.

**Request Body:**
```json
{
  "name": "Lunch Specials",
  "description": "Delicious lunch options for a quick meal"
}
```

**Fields:**
- `name` (string, required): Category name
- `description` (string, required): Category description

**Response:**
- `201 Created`: Category successfully created

**Authentication:** Required (ADMIN only)

---

### Get All Categories

```http
GET /categories
```

Retrieve all categories.

**Response:**
- `200 OK`: Returns array of categories

**Authentication:** Not required

---

### Get Category By ID

```http
GET /categories/:categoryId
```

Retrieve a specific category by ID.

**Path Parameters:**
- `categoryId` (string): Category's UUID

**Response:**
- `200 OK`: Returns category details
- `404 Not Found`: Category not found

**Authentication:** Not required

---

### Update Category

```http
PATCH /categories/:categoryId
Content-Type: application/json
Authorization: Bearer <admin_token>
```

Update a category's information.

**Path Parameters:**
- `categoryId` (string): Category's UUID

**Request Body:**
```json
{
  "name": "Updated Fast Food",
  "description": "Updated description for quick meals"
}
```

**Fields:**
- `name` (string, optional): Updated category name
- `description` (string, optional): Updated category description

**Response:**
- `200 OK`: Category successfully updated
- `404 Not Found`: Category not found

**Authentication:** Required (ADMIN only)

---

### Delete Category

```http
DELETE /categories/:categoryId
Authorization: Bearer <admin_token>
```

Delete a category from the system.

**Path Parameters:**
- `categoryId` (string): Category's UUID

**Response:**
- `200 OK`: Category successfully deleted
- `404 Not Found`: Category not found

**Authentication:** Required (ADMIN only)

---

## Menu Items

### Create Menu Item

```http
POST /menu-items
Content-Type: application/json
Authorization: Bearer <admin_token>
```

Create a new menu item.

**Request Body:**
```json
{
  "name": "Chicken Nuggets",
  "description": "Crispy fried chicken nuggets",
  "price": 5.99,
  "available": true,
  "categoryId": "b80b1c4a-0756-4fb4-949e-e35436339a0b"
}
```

**Fields:**
- `name` (string, required): Menu item name
- `description` (string, required): Menu item description
- `price` (number, required): Price in currency units
- `available` (boolean, required): Whether the item is available for order
- `categoryId` (string, required): UUID of the category this item belongs to

**Response:**
- `201 Created`: Menu item successfully created

**Authentication:** Required (ADMIN only)

---

### Get All Menu Items

```http
GET /menu-items
```

Retrieve all menu items.

**Response:**
- `200 OK`: Returns array of menu items

**Authentication:** Not required

---

### Get Menu Item By ID

```http
GET /menu-items/:menuItemId
```

Retrieve a specific menu item by ID.

**Path Parameters:**
- `menuItemId` (string): Menu item's UUID

**Response:**
- `200 OK`: Returns menu item details
- `404 Not Found`: Menu item not found

**Authentication:** Not required

---

### Get Menu Items By Category

```http
GET /menu-items/category/:categoryId
Authorization: Bearer <admin_token>
```

Retrieve all menu items in a specific category.

**Path Parameters:**
- `categoryId` (string): Category's UUID

**Response:**
- `200 OK`: Returns array of menu items in the category

**Authentication:** Required (ADMIN only)

---

### Update Menu Item

```http
PATCH /menu-items/:menuItemId
Content-Type: application/json
Authorization: Bearer <admin_token>
```

Update a menu item's information.

**Path Parameters:**
- `menuItemId` (string): Menu item's UUID

**Request Body:**
```json
{
  "price": 5.49,
  "available": false
}
```

**Fields:**
- `name` (string, optional): Updated menu item name
- `description` (string, optional): Updated menu item description
- `price` (number, optional): Updated price
- `available` (boolean, optional): Updated availability status
- `categoryId` (string, optional): Updated category UUID

**Response:**
- `200 OK`: Menu item successfully updated
- `404 Not Found`: Menu item not found

**Authentication:** Required (ADMIN only)

---

### Delete Menu Item

```http
DELETE /menu-items/:menuItemId
Authorization: Bearer <admin_token>
```

Delete a menu item from the system.

**Path Parameters:**
- `menuItemId` (string): Menu item's UUID

**Response:**
- `200 OK`: Menu item successfully deleted
- `404 Not Found`: Menu item not found

**Authentication:** Required (ADMIN only)

---

## Orders

### Create Order

```http
POST /orders
Content-Type: application/json
Authorization: Bearer <token>
```

Create a new order for the authenticated user.

**Request Body:**
```json
{
  "orderItems": [
    {
      "menuItemId": "459aedee-223d-4da8-b992-ac0b9ac8244d",
      "quantity": 3
    }
  ]
}
```

**Fields:**
- `orderItems` (array, required): Array of order items
  - `menuItemId` (string, required): UUID of the menu item
  - `quantity` (number, required): Quantity to order (must be > 0)

**Response:**
- `201 Created`: Order successfully created

**Authentication:** Required (USER or ADMIN)

---

### Get All Orders

```http
GET /orders
Authorization: Bearer <admin_token>
```

Retrieve all orders in the system.

**Response:**
- `200 OK`: Returns array of all orders

**Authentication:** Required (ADMIN only)

---

### Get User's Orders

```http
GET /orders/my-orders
Authorization: Bearer <token>
```

Retrieve all orders for the authenticated user.

**Response:**
- `200 OK`: Returns array of user's orders

**Authentication:** Required (USER or ADMIN)

---

### Get Order By ID

```http
GET /orders/:orderId
Authorization: Bearer <token>
```

Retrieve a specific order by ID.

**Path Parameters:**
- `orderId` (string): Order's UUID

**Response:**
- `200 OK`: Returns order details
- `404 Not Found`: Order not found

**Authentication:** Required (USER or ADMIN)
- **USER**: Can only access their own orders
- **ADMIN**: Can access any order

---

### Update Order Status

```http
PATCH /orders/:orderId/status
Content-Type: application/json
Authorization: Bearer <admin_token>
```

Update an order's status.

**Path Parameters:**
- `orderId` (string): Order's UUID

**Request Body:**
```json
{
  "status": "READY"
}
```

**Fields:**
- `status` (string, required): New order status

**Available Statuses:**
- `PENDING`: Order is placed and waiting to be processed
- `PREPARING`: Order is being prepared
- `READY`: Order is ready for pickup/delivery
- `DELIVERED`: Order has been delivered
- `CANCELLED`: Order has been cancelled

**Response:**
- `200 OK`: Order status successfully updated
- `404 Not Found`: Order not found

**Authentication:** Required (ADMIN only)

---

### Delete Order

```http
DELETE /orders/:orderId
Authorization: Bearer <admin_token>
```

Delete an order from the system.

**Path Parameters:**
- `orderId` (string): Order's UUID

**Response:**
- `200 OK`: Order successfully deleted
- `404 Not Found`: Order not found

**Authentication:** Required (ADMIN only)

---

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "statusCode": 400,
  "message": "Validation error message",
  "error": "Bad Request"
}
```

### 401 Unauthorized
```json
{
  "statusCode": 401,
  "message": "Unauthorized",
  "error": "Unauthorized"
}
```

### 403 Forbidden
```json
{
  "statusCode": 403,
  "message": "Forbidden resource",
  "error": "Forbidden"
}
```

### 404 Not Found
```json
{
  "statusCode": 404,
  "message": "Resource not found",
  "error": "Not Found"
}
```

### 500 Internal Server Error
```json
{
  "statusCode": 500,
  "message": "Internal server error",
  "error": "Internal Server Error"
}
```

---

## Notes

- All dates and times are in ISO 8601 format
- All UUIDs follow the UUID v4 standard
- Passwords must meet minimum security requirements (typically 8+ characters with mixed case, numbers, and special characters)
- JWT tokens expire after 1 hour (3600 seconds)
- All request bodies must be valid JSON with `Content-Type: application/json` header