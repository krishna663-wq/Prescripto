# Prescripto

A full-stack doctor appointment booking platform with three modules:
- `frontend` for patients
- `admin` dashboard for management
- `backend` REST API and business logic

This project demonstrates end-to-end product development using the MERN ecosystem, including authentication, profile management, appointment scheduling, doctor management, and media upload integration.

## Key Features

- User registration and login with JWT authentication
- Doctor discovery by speciality
- Doctor profile pages with fees, experience, and availability
- Appointment booking with slot conflict checks
- Appointment cancellation with slot release logic
- User profile update with image upload support
- Admin login and protected admin APIs
- Add doctor from admin panel with Cloudinary image upload
- Toggle doctor availability from admin dashboard

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, Axios, React Router
- Admin Panel: React, Vite, Tailwind CSS, Axios
- Backend: Node.js, Express.js, MongoDB, Mongoose
- Auth/Security: JWT, bcrypt/bcryptjs
- File/Image Handling: Multer, Cloudinary

## Project Structure

```text
Prescripto-main/
├── frontend/   # Patient-facing app (port 5173)
├── admin/      # Admin dashboard (port 5174)
└── backend/    # API server (port 4000 by default)
```

## Environment Variables

Create a `.env` file inside `backend/`:

```env
PORT=4000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password

CLOUDINARY_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret
```

Create a `.env` file inside `frontend/`:

```env
VITE_BACKEND_URL=http://localhost:4000
```

Create a `.env` file inside `admin/`:

```env
VITE_BACKEND_URL=http://localhost:4000
```

## Local Setup

1. Clone the repository.
2. Install dependencies in all modules.
3. Add environment variables.
4. Run backend, frontend, and admin in separate terminals.

```bash
# Terminal 1
cd backend
npm install
npm run server

# Terminal 2
cd frontend
npm install
npm run dev

# Terminal 3
cd admin
npm install
npm run dev
```

## API Overview

Base URL: `http://localhost:4000`

### Admin Routes

- `POST /api/admin/login` - Admin login
- `POST /api/admin/add-doctor` - Add doctor (protected, multipart form-data)
- `POST /api/admin/all-doctors` - Get all doctors (protected)
- `POST /api/admin/change-availability` - Toggle doctor availability (protected)

### Doctor Routes

- `GET /api/doctor/list` - List all doctors

### User Routes

- `POST /api/user/register` - Register user
- `POST /api/user/login` - Login user
- `GET /api/user/get-profile` - Get current user profile (protected)
- `POST /api/user/update-profile` - Update profile (protected, optional image)
- `POST /api/user/book-appointment` - Book appointment (protected)
- `GET /api/user/appointments` - Get user appointments (protected)
- `POST /api/user/cancel-appointment` - Cancel appointment (protected)

## Resume Highlights (Copy-Ready)

- Built a full-stack healthcare appointment platform using React, Node.js, Express, and MongoDB with separate patient and admin applications.
- Implemented JWT-based authentication and protected route middleware for role-based access control.
- Developed appointment booking and cancellation workflows with real-time slot conflict prevention.
- Integrated Cloudinary and Multer for secure doctor/profile image uploads.
- Designed and consumed REST APIs across multiple frontend clients using Axios and React Context.

## Current Status

- Core patient and admin workflows are implemented and functional.
- Razorpay payment integration is scaffolded in backend but not completed yet.
- Some admin pages (dashboard/appointments) are currently placeholders.

## Author

Krishna Gopal Sharma
