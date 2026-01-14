# URL Configuration Task

## Objective
Configure all applications to use:
- **Backend**: https://af-mart828.vercel.app
- **Frontend**: https://afmart.vercel.app

## Task List

### Step 1: Update Client `backendApi.js`
- [x] Change API_BASE_URL from localhost to production backend

### Step 2: Update Client `api.js`
- [x] Change API_BASE_URL from fakestoreapi to production backend

### Step 3: Update Admin `api.js`
- [x] Update API_BASE_URL to production backend

### Step 4: Update Backend `server.js`
- [x] Configure CORS for afmart.vercel.app origin

### Step 5: Update Client `vercel.json`
- [x] Update API rewrites to point to production backend

## Status: COMPLETED ✅

## Summary of Changes

| File | Change |
|------|--------|
| `client/src/services/api/backendApi.js` | API_BASE_URL → `https://af-mart828.vercel.app/api` |
| `client/src/services/api/api.js` | API_BASE_URL → `https://af-mart828.vercel.app/api` |
| `admin/src/api/api.js` | API_BASE_URL → `https://af-mart828.vercel.app/api` |
| `backend/server.js` | CORS origin → `https://afmart.vercel.app` |
| `client/vercel.json` | API rewrite destination → `https://af-mart828.vercel.app` |
| `admin/vercel.json` | Vercel configuration for React build |

## Environment Files Created

| File | Contents |
|------|----------|
| `admin/.env` | REACT_APP_API_URL, REACT_APP_BACKEND_URL, REACT_APP_FRONTEND_URL |
| `backend/.env` | PORT, NODE_ENV, MONGODB_URI, JWT_SECRET, CORS_ORIGIN, FRONTEND_URL |
| `client/.env` | REACT_APP_API_URL, REACT_APP_BACKEND_URL, REACT_APP_FRONTEND_URL |

> **Note**: Update `backend/.env` with your actual MongoDB URI and JWT_SECRET for production.

