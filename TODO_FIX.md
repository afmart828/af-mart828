# TODO: Fix /api/auth/login Not Found Error

## Issue Summary
- Admin frontend calls `/api/auth/login`
- Backend doesn't have this route defined
- Routes are currently under `/api/users` prefix

## Implementation Plan

### Step 1: Create auth routes file
- [x] Create `backend/routes/authRoutes.js` with:
  - `/api/auth/login` - Admin login endpoint
  - `/api/auth/user/login` - User login endpoint

### Step 2: Modify user routes
- [x] Update `backend/routes/userRoutes.js`:
  - Keep existing `/users/signup` endpoint
  - Update `/users/login` to properly handle user authentication
  - Removed duplicate `/auth/login` route

### Step 3: Update server.js
- [x] Add auth routes to `backend/server.js`:
  - Import authRoutes
  - Add `app.use('/api/auth', authRoutes);`

### Step 4: Update frontend API
- [x] Update `admin/src/api/api.js`:
  - Change login endpoint to `/auth/login` (removes duplicate `/api`)
  - Now correctly points to `/api/auth/login`

## Status: COMPLETED ✅

## Changes Made:
1. ✅ Created `backend/routes/authRoutes.js` with separate admin and user login endpoints
2. ✅ Cleaned up `backend/routes/userRoutes.js` to remove duplicate auth route
3. ✅ Updated `backend/server.js` to mount auth routes under `/api/auth`
4. ✅ Fixed frontend `admin/src/api/api.js` to use correct endpoint

## Testing:
To test the fix:
1. Start the backend server: `cd backend && npm start`
2. Start the admin frontend: `cd admin && npm start`
3. Try logging in at `/login`
4. Expected: Login should succeed without "Not Found" error

## API Endpoints Now Available:
- **Admin Login:** `POST /api/auth/login`
- **User Login:** `POST /api/auth/user/login`
- **User Signup:** `POST /api/users/signup`
- **User Login:** `POST /api/users/login`

