# AF Mart Integration Guide

## Overview
This document describes how the admin panel, backend API, and client frontend are integrated and working together.

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Client (Port 3000)                       │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  UserContext         CartContext        Home, ProductPage  │  │
│  │  └─ backendApi.js    └─ CartContext.js   Checkout.js      │  │
│  └───────────────────────────────────────────────────────────┘  │
└──────────────────────────────┬──────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Backend API (Port 5000)                       │
│  ┌──────────────┐ ┌───────────────┐ ┌────────────────────────┐  │
│  │  /api/users  │ │ /api/products │ │ /api/orders           │  │
│  │  /api/auth   │ │               │ │                        │  │
│  └──────────────┘ └───────────────┘ └────────────────────────┘  │
└──────────────────────────────┬──────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                     MongoDB Database                             │
│         (Users, Products, Orders Collections)                    │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                   Admin Panel (Port 3001)                        │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  Login  Dashboard  Products  Orders  Settings              │  │
│  │  └─ api.js                                              │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## Backend API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user (returns { success, data: { token, user } })

### Users
- `GET /api/users/profile` - Get user profile (protected)
- `PUT /api/users/profile` - Update user profile (protected)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (protected, admin)
- `PUT /api/products/:id` - Update product (protected, admin)
- `DELETE /api/products/:id` - Delete product (protected, admin)

### Orders
- `GET /api/orders` - Get all orders (protected, admin)
- `GET /api/orders/myorders` - Get user's orders (protected)
- `GET /api/orders/:id` - Get order by ID (protected)
- `POST /api/orders` - Create new order (protected)

## Integration Points

### 1. Admin Panel → Backend
- **File**: `admin/src/api/api.js`
- **API Base URL**: `http://localhost:5000` (configurable via `REACT_APP_API_URL`)
- **Authentication**: Bearer token stored in localStorage
- **Login Flow**:
  1. Admin submits credentials to `/api/auth/login`
  2. Backend returns `{ success: true, data: { token, user: { role: 'admin', ... } } }`
  3. Token stored in localStorage and used for subsequent requests

### 2. Client → Backend
- **File**: `client/src/services/api/backendApi.js`
- **API Base URL**: `http://localhost:5000` (configurable via `REACT_APP_API_URL`)
- **Fallback**: If backend is unavailable, falls back to mock API (`api.js`)

### 3. Database Schema
- **Users**: `_id`, `name`, `email`, `password`, `role`, `createdAt`
- **Products**: `_id`, `name`, `description`, `price`, `image`, `category`, `countInStock`, `brand`
- **Orders**: `_id`, `user`, `orderItems`, `shippingAddress`, `paymentMethod`, `itemsPrice`, `shippingPrice`, `taxPrice`, `totalPrice`, `isPaid`, `isDelivered`, `createdAt`

## Configuration

### Environment Variables (Backend)
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/afmart
JWT_SECRET=your_jwt_secret
CORS_ORIGIN=http://localhost:3000,http://localhost:3001
```

### Environment Variables (Admin)
```env
REACT_APP_API_URL=http://localhost:5000
```

### Environment Variables (Client)
```env
REACT_APP_API_URL=http://localhost:5000
```

## Key Files Modified

### Backend
- `server.js` - CORS configuration for admin (3001) and client (3000)
- `routes/userRoutes.js` - Auth routes with `/api/auth/login`
- `controllers/userController.js` - Login with success response format

### Admin
- `src/api/api.js` - API configuration for backend URL
- `src/pages/Login/Login.js` - Login with demo credentials

### Client
- `src/services/api/backendApi.js` - New unified API service
- `src/context/UserContext/UserContext.js` - Login/register using backend
- `src/page/Home/Home.js` - Products with backend fallback
- `src/page/ProductPage/ProductPage.js` - Product details with fallback
- `src/page/Checkout/Checkout.js` - Order creation with fallback
- `src/page/OrderHistoryPage/OrderHistory.js` - Order history with fallback
- `src/components/ProductCard/ProductCard.js` - Support both _id and id

## Running the Application

### 1. Start MongoDB
```bash
mongod
```

### 2. Start Backend
```bash
cd backend
npm install
npm start
```

### 3. Start Admin Panel
```bash
cd admin
npm install
npm start
# Runs on http://localhost:3001
```

### 4. Start Client
```bash
cd client
npm install
npm start
# Runs on http://localhost:3000
```

## Default Credentials

### Admin Panel
- Email: `admin@example.com`
- Password: `admin123`

### MongoDB Seed Data
The backend includes seed data that creates:
- Admin user (admin@example.com / admin123)
- Sample products
- Sample orders

## Error Handling

All components implement graceful fallback:
1. Try to connect to real backend
2. If backend fails (network error, server down), fall back to mock API
3. User sees mock data but functionality still works

## Testing Checklist

- [ ] Admin login works with backend credentials
- [ ] Client login/signup works with backend
- [ ] Products load from backend (or fallback to mock)
- [ ] Add to cart works with product IDs
- [ ] Checkout creates order in backend (or mock)
- [ ] Order history shows orders from backend (or mock)
- [ ] CORS errors are resolved with proper configuration

## Troubleshooting

### CORS Errors
- Ensure `CORS_ORIGIN` includes both admin (3001) and client (3000) URLs
- Backend must be running before frontend requests

### MongoDB Connection
- Ensure MongoDB is running on default port 27017
- Check `MONGO_URI` in backend `.env`

### Authentication Issues
- Clear localStorage if tokens are corrupted
- Check browser console for JWT token errors
- Ensure backend JWT_SECRET matches

### Product ID Issues
- Backend uses `_id` (MongoDB ObjectId)
- Mock API uses `id` (integer)
- All components now handle both formats

