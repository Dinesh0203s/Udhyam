# Firebase Google Login & MongoDB Setup Guide

This project uses Firebase Authentication for Google login and MongoDB for user data storage.

## Prerequisites

1. A Firebase project with Authentication enabled
2. A MongoDB database (local or Atlas)

## Setup Instructions

### 1. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Enable Authentication:
   - Go to Authentication > Sign-in method
   - Enable "Google" as a sign-in provider
   - Add your domain to authorized domains if needed
4. Get your Firebase configuration:
   - Go to Project Settings > General
   - Scroll down to "Your apps" section
   - Click on the Web app icon (</>) or create a new web app
   - Copy the Firebase configuration object

### 2. MongoDB Setup

#### Option A: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/udhayam`

#### Option B: MongoDB Atlas (Cloud)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Get your connection string: `mongodb+srv://username:password@cluster.mongodb.net/udhayam`

### 3. Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# MongoDB Connection String
MONGODB_URI=mongodb://localhost:27017/udhayam
# Or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/udhayam
```

**Important:** 
- Replace all placeholder values with your actual Firebase and MongoDB credentials
- Never commit `.env.local` to version control
- The `.env.local` file is already in `.gitignore`

### 4. Install Dependencies

```bash
npm install --legacy-peer-deps
```

### 5. Run the Project

```bash
npm run dev
```

## How It Works

1. **User Login**: Users sign in with Google via Firebase Authentication
2. **User Creation**: On first login, a user record is created in MongoDB
3. **Onboarding**: If the user is not onboarded, they are redirected to the onboarding page
4. **Dashboard Access**: Only onboarded users can access the dashboard

## Flow

1. User visits the site → Sees landing page
2. User clicks "Get Started" → Redirected to `/login`
3. User signs in with Google → Firebase authenticates
4. If new user → User record created in MongoDB with `isOnboarded: false`
5. If not onboarded → Redirected to `/onboarding`
6. User completes onboarding → `isOnboarded` set to `true` in MongoDB
7. User redirected to `/dashboard`

## API Routes

- `POST /api/users` - Create a new user
- `GET /api/users/[uid]` - Get user by Firebase UID
- `PATCH /api/users/[uid]` - Update user data
- `POST /api/users/onboard` - Complete user onboarding

## Troubleshooting

### Firebase Errors
- Ensure Firebase Authentication is enabled
- Check that Google sign-in provider is enabled
- Verify all environment variables are correct

### MongoDB Errors
- Check MongoDB connection string
- Ensure MongoDB is running (if local)
- Verify network access (if using Atlas)

### Build Errors
- Run `npm install --legacy-peer-deps` to resolve peer dependency issues
- Clear `.next` folder and rebuild if needed


