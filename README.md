# Serene Sikkim Paths

A comprehensive web application for exploring the sacred monasteries and spiritual heritage of Sikkim, India. Features interactive 3D models, real-time weather information, multilingual support, and a full-stack authentication system.

## ✨ Features

- 🏔️ **Interactive Monastery Explorer**: Browse and explore detailed information about Sikkim's monasteries
- 🗺️ **Interactive Map**: View monastery locations with routing capabilities
- 🎨 **3D Models**: View detailed 3D models of monasteries
- 🌤️ **Weather Integration**: Real-time weather information for monastery locations
- 🌍 **Multilingual Support**: Available in English, Hindi, Nepali, Tamil, and French
- 🔐 **Authentication System**: Secure user registration and login with JWT
- 📸 **Gallery & Reviews**: User comments and ratings for monasteries
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🎯 **Tour Planning**: Plan your visit with curated tour packages

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd serene-sikkim-paths
```

2. Install frontend dependencies:
```bash
npm install
```

3. Install backend dependencies:
```bash
cd backend
npm install
cd ..
```

4. Configure environment variables:
   - Frontend: Update `.env` if needed (defaults to `http://localhost:5000/api`)
   - Backend: Update `backend/.env` (change `JWT_SECRET` for production)

### Running the Application

#### Option 1: Use Start Scripts (Windows)

**PowerShell:**
```powershell
.\start.ps1
```

**Command Prompt:**
```cmd
start.bat
```

#### Option 2: Manual Start

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

#### Option 3: Run Individually

**Frontend only:**
```bash
npm run dev
```

**Backend only:**
```bash
npm run dev:backend
```

### Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api
- **API Health Check**: http://localhost:5000/api/health

## 🔐 Authentication System

The application now features a complete authentication system:

### Features
- User registration with email validation
- Secure login with JWT tokens
- Password hashing with bcrypt
- Captcha verification
- Session management
- Protected routes

### Usage

1. **Register**: Create a new account with your name, email, and password
2. **Login**: Sign in with your credentials
3. **Captcha**: Complete the captcha verification
4. **Explore**: Access all features of the application
5. **Logout**: Sign out when finished

For detailed authentication documentation, see [AUTHENTICATION_GUIDE.md](AUTHENTICATION_GUIDE.md)

## 📁 Project Structure

```
serene-sikkim-paths/
├── backend/                  # Express.js backend
│   ├── controllers/          # Request handlers
│   ├── middleware/           # Custom middleware
│   ├── models/              # Data models
│   ├── routes/              # API routes
│   └── server.js            # Backend entry point
├── src/
│   ├── components/          # React components
│   ├── contexts/            # React contexts (Auth, etc.)
│   ├── data/                # Static data
│   ├── hooks/               # Custom hooks
│   ├── i18n/                # Internationalization
│   ├── pages/               # Page components
│   ├── services/            # API services
│   └── lib/                 # Utilities
├── public/                  # Static assets
├── .env                     # Frontend environment config
└── package.json             # Frontend dependencies
```

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **UI Library**: Radix UI + shadcn/ui
- **Styling**: Tailwind CSS
- **3D Graphics**: Three.js with React Three Fiber
- **Maps**: Leaflet with React-Leaflet
- **Routing**: React Router v6
- **State Management**: React Context API
- **Internationalization**: i18next
- **Data Fetching**: TanStack Query

### Backend
- **Framework**: Express.js
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **Validation**: express-validator
- **CORS**: cors middleware
- **Storage**: JSON file (upgradeable to MongoDB/PostgreSQL)

## 📚 Documentation

- [Authentication Guide](AUTHENTICATION_GUIDE.md) - Complete authentication setup and usage
- [Backend API Documentation](backend/README.md) - API endpoints and usage
- [Weather Feature Summary](WEATHER_FEATURE_SUMMARY.md) - Weather integration details
- [Gallery Features](GALLERY_VISITOR_FEATURES.md) - Gallery and review system

## 🔧 Development

### Available Scripts

```bash
npm run dev              # Start frontend dev server
npm run dev:backend      # Start backend dev server
npm run build            # Build frontend for production
npm run build:dev        # Build frontend in development mode
npm run lint             # Run ESLint
npm run preview          # Preview production build
```

### Environment Variables

**Frontend (`.env`):**
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

**Backend (`backend/.env`):**
```env
PORT=5000
JWT_SECRET=your-secret-key-change-this-in-production
JWT_EXPIRE=24h
NODE_ENV=development
```

## 🎯 Key Features Explained

### Interactive Map
- View all monastery locations on an interactive map
- Get directions and routing information
- View monastery details directly from map markers

### 3D Monastery Models
- View detailed 3D representations of monasteries
- Rotate, zoom, and explore models
- Fullscreen viewing mode

### Weather Integration
- Real-time weather data for monastery locations
- 7-day weather forecasts
- Weather history and trends
- Visual weather charts

### Multilingual Support
- Switch between 5 languages: English, Hindi, Nepali, Tamil, French
- Persistent language preference
- Comprehensive translations

### User Authentication
- Secure registration and login
- JWT-based token authentication
- Protected routes and features
- Session management

## 🔒 Security Considerations

- Passwords are hashed using bcrypt before storage
- JWT tokens for stateless authentication
- Token expiration (24 hours default)
- Input validation on both frontend and backend
- CORS configured for security
- Environment variables for sensitive data

## 🚀 Deployment

### Frontend
- Build: `npm run build`
- Deploy to: Vercel, Netlify, or any static hosting service

### Backend
- Deploy to: Heroku, AWS, DigitalOcean, or any Node.js hosting
- Update CORS origin in `backend/server.js`
- Change JWT_SECRET to a secure random string
- Consider migrating to a proper database

### Production Checklist
- [ ] Update JWT_SECRET in backend
- [ ] Configure CORS for production domain
- [ ] Set up proper database (MongoDB/PostgreSQL)
- [ ] Enable HTTPS
- [ ] Set up environment-specific configs
- [ ] Configure logging and monitoring
- [ ] Set up automated backups
- [ ] Configure rate limiting
- [ ] Add error tracking (Sentry, etc.)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

ISC

## 🙏 Acknowledgments

- Sikkim Tourism for inspiration
- The open-source community for amazing tools and libraries
- Contributors and testers

## 📧 Support

For issues or questions:
1. Check the [Authentication Guide](AUTHENTICATION_GUIDE.md)
2. Review the [Backend Documentation](backend/README.md)
3. Check browser console for errors
4. Review server logs

## 🗺️ Roadmap

- [ ] MongoDB/PostgreSQL integration
- [ ] Email verification
- [ ] Password reset functionality
- [ ] OAuth integration (Google, Facebook)
- [ ] Two-factor authentication
- [ ] User profile management
- [ ] Advanced tour booking system
- [ ] Payment integration
- [ ] Admin dashboard
- [ ] Enhanced analytics

---

Made with ❤️ for exploring Sikkim's spiritual heritage
