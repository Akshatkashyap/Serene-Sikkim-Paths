# Authentication Integration Guide

## Overview

The application now uses a full-stack authentication system with an Express.js backend and JWT-based authentication. The mock authentication has been completely removed and replaced with real API integration.

## What Changed

### Backend (New)
- ✅ Express.js server with authentication endpoints
- ✅ JWT-based token authentication
- ✅ Password hashing with bcrypt
- ✅ File-based user storage
- ✅ Input validation
- ✅ Error handling middleware
- ✅ CORS configuration for frontend

### Frontend (Updated)
- ✅ Removed hardcoded credentials
- ✅ Created API service layer (`authAPI.ts`)
- ✅ Updated `AuthContext` to use real API
- ✅ Updated `LoginModal` to call backend endpoints
- ✅ Added JWT token management
- ✅ Added environment configuration

## Setup Instructions

### 1. Install Backend Dependencies

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Backend environment variables are already set in `backend/.env`:
- `PORT=5000`
- `JWT_SECRET=your-secret-key-change-this-in-production`
- `JWT_EXPIRE=24h`
- `NODE_ENV=development`

**Important:** Change `JWT_SECRET` to a secure random string in production.

Frontend environment variables are in `.env`:
- `VITE_API_BASE_URL=http://localhost:5000/api`

### 3. Start the Backend Server

In the backend directory:

```bash
# Development mode (with auto-restart)
npm run dev

# Or production mode
npm start
```

The server will start on http://localhost:5000

### 4. Start the Frontend Development Server

In the root directory:

```bash
npm run dev
```

The frontend will run on http://localhost:5173

## Testing the Authentication

### Register a New User

1. Open the application in your browser
2. Click "Sign Up" in the login modal
3. Fill in your details:
   - Full Name
   - Email
   - Password (minimum 6 characters)
   - Confirm Password
4. Click "Create Account"
5. Complete the captcha verification
6. You'll be logged in automatically

### Login with Existing User

1. Use the email and password you registered with
2. Complete the captcha verification
3. You'll be logged in and can access all features

### Logout

Click the "Logout" button in the navigation menu.

## Architecture

### Authentication Flow

1. **Registration:**
   ```
   Frontend → POST /api/auth/register → Backend
   Backend → Validate → Hash Password → Store User → Generate JWT
   Backend → Return Token & User → Frontend
   Frontend → Store Token → Show Captcha
   Frontend → Verify Captcha → Complete Login
   ```

2. **Login:**
   ```
   Frontend → POST /api/auth/login → Backend
   Backend → Validate → Check Password → Generate JWT
   Backend → Return Token & User → Frontend
   Frontend → Store Token → Show Captcha
   Frontend → Verify Captcha → Complete Login
   ```

3. **Protected Routes:**
   ```
   Frontend → Include JWT in Authorization Header
   Backend → Verify Token → Grant/Deny Access
   ```

### File Structure

```
serene-sikkim-paths/
├── backend/                      # New backend directory
│   ├── controllers/
│   │   └── authController.js    # Auth logic
│   ├── middleware/
│   │   ├── auth.js              # JWT verification
│   │   └── errorHandler.js      # Error handling
│   ├── models/
│   │   └── User.js              # User model
│   ├── routes/
│   │   └── auth.js              # Auth routes
│   ├── data/
│   │   └── users.json           # User storage (auto-generated)
│   ├── .env                      # Backend config
│   ├── .gitignore
│   ├── package.json
│   ├── README.md
│   └── server.js                # Entry point
├── src/
│   ├── services/
│   │   └── authAPI.ts           # New: API service layer
│   ├── contexts/
│   │   └── AuthContext.tsx      # Updated: Real API integration
│   ├── components/
│   │   └── LoginModal.tsx       # Updated: Real auth flow
│   └── ...
└── .env                          # Frontend config
```

## API Endpoints

### Public Endpoints

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/verify-captcha` - Verify captcha code

### Protected Endpoints

- `GET /api/auth/me` - Get current user info
- `POST /api/auth/logout` - Logout user

### Health Check

- `GET /api/health` - Server health status

## Security Features

1. **Password Security:**
   - Passwords hashed with bcrypt (salt rounds: 10)
   - Never stored in plain text

2. **Token Security:**
   - JWT tokens with 24-hour expiration
   - Stored in localStorage (client-side)
   - Sent via Authorization header

3. **Validation:**
   - Email format validation
   - Password length validation (min 6 chars)
   - Input sanitization with express-validator

4. **CORS:**
   - Configured to accept requests from frontend origin
   - Credentials enabled

## Data Storage

Currently using JSON file storage (`backend/data/users.json`) for simplicity. 

**For Production:**
- Migrate to a proper database (MongoDB, PostgreSQL, MySQL)
- Implement proper connection pooling
- Add database migrations
- Set up backups

## Troubleshooting

### Backend Not Starting

- Check if port 5000 is already in use
- Run: `netstat -ano | findstr :5000` (Windows) or `lsof -i :5000` (Mac/Linux)
- Change port in `backend/.env` if needed

### Connection Refused Error

- Ensure backend server is running
- Check `VITE_API_BASE_URL` in `.env`
- Verify CORS configuration in `backend/server.js`

### Token Expired

- Tokens expire after 24 hours
- User will need to login again
- Clear localStorage and refresh page if issues persist

### Login Not Working

- Check browser console for errors
- Verify backend server is running
- Check network requests in DevTools
- Ensure email/password are correct

## Next Steps

### Recommended Improvements

1. **Database Migration:**
   - Set up MongoDB or PostgreSQL
   - Create proper schema/models
   - Add connection pooling

2. **Enhanced Security:**
   - Add refresh tokens
   - Implement token blacklisting
   - Add rate limiting
   - Add CSRF protection
   - Use HTTPS in production

3. **Features:**
   - Email verification
   - Password reset functionality
   - OAuth integration (Google, Facebook)
   - Two-factor authentication
   - User profile management

4. **Testing:**
   - Add unit tests
   - Add integration tests
   - Add E2E tests

5. **Deployment:**
   - Set up environment-specific configs
   - Deploy backend to cloud service (Heroku, AWS, DigitalOcean)
   - Deploy frontend to Vercel/Netlify
   - Set up CI/CD pipeline

## Support

For issues or questions:
1. Check the backend logs
2. Check browser console
3. Review API documentation in `backend/README.md`
4. Check network requests in DevTools

## License

ISC
