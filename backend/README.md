# Serene Sikkim Paths - Backend API

This is the Express.js backend API for the Serene Sikkim Paths application, providing authentication services.

## Features

- User registration with email and password
- User login with JWT authentication
- Password hashing with bcrypt
- Token-based authentication
- Captcha verification
- File-based user storage (JSON)

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
   - Copy `.env` file and update the values if needed
   - Change `JWT_SECRET` to a secure random string in production

## Running the Server

### Development Mode (with auto-restart):
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```

The server will start on port 5000 by default (configurable in `.env`).

## API Endpoints

### Authentication

#### Register User
- **POST** `/api/auth/register`
- **Body:**
  ```json
  {
    "fullName": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "User registered successfully",
    "token": "jwt_token_here",
    "user": {
      "id": "user_id",
      "fullName": "John Doe",
      "email": "john@example.com",
      "createdAt": "2026-02-27T..."
    }
  }
  ```

#### Login User
- **POST** `/api/auth/login`
- **Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response:** Same as register

#### Get Current User
- **GET** `/api/auth/me`
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  ```json
  {
    "success": true,
    "user": {
      "id": "user_id",
      "fullName": "John Doe",
      "email": "john@example.com",
      "createdAt": "2026-02-27T..."
    }
  }
  ```

#### Verify Captcha
- **POST** `/api/auth/verify-captcha`
- **Body:**
  ```json
  {
    "captcha": "ABC12",
    "expectedCaptcha": "ABC12"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Captcha verified"
  }
  ```

#### Logout
- **POST** `/api/auth/logout`
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  ```json
  {
    "success": true,
    "message": "Logged out successfully"
  }
  ```

#### Health Check
- **GET** `/api/health`
- **Response:**
  ```json
  {
    "status": "ok",
    "message": "Server is running"
  }
  ```

## Project Structure

```
backend/
├── controllers/
│   └── authController.js    # Authentication logic
├── middleware/
│   ├── auth.js             # JWT verification middleware
│   └── errorHandler.js     # Error handling middleware
├── models/
│   └── User.js             # User model and database operations
├── routes/
│   └── auth.js             # Authentication routes
├── data/
│   └── users.json          # User data storage (auto-generated)
├── .env                     # Environment variables
├── .gitignore
├── package.json
└── server.js               # Main application entry point
```

## Security Notes

- Passwords are hashed using bcrypt before storage
- JWT tokens expire after 24 hours (configurable)
- CORS is enabled for `http://localhost:5173` (Vite frontend)
- Update `JWT_SECRET` in `.env` for production use
- Consider using a proper database (MongoDB, PostgreSQL) for production

## Data Storage

Currently uses a JSON file (`data/users.json`) for simplicity. For production:
- Consider migrating to MongoDB, PostgreSQL, or another database
- Implement proper database connections and migrations
- Add data validation and indexing

## Error Handling

All errors are caught and returned in a consistent format:
```json
{
  "success": false,
  "message": "Error message here"
}
```

## Environment Variables

- `PORT`: Server port (default: 5000)
- `JWT_SECRET`: Secret key for JWT signing
- `JWT_EXPIRE`: Token expiration time (default: 24h)
- `NODE_ENV`: Environment mode (development/production)

## CORS Configuration

Update the CORS origin in `server.js` to match your frontend URL:
```javascript
app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  credentials: true
}));
```

## License

ISC
