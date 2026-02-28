# Auth App - Next.js Full Stack Authentication

A full-stack authentication system built with Next.js 16, MongoDB, and Nodemailer.

## Features

- ✅ User Signup with email verification
- ✅ User Login with JWT authentication
- ✅ Protected routes with middleware
- ✅ Email verification via Mailtrap
- ✅ Forgot password flow
- ✅ Reset password with token expiry
- ✅ Logout

## Tech Stack

- **Frontend:** Next.js 16, React 19, Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** MongoDB Atlas + Mongoose
- **Authentication:** JWT (jsonwebtoken)
- **Email:** Nodemailer + Mailtrap
- **Password Hashing:** bcryptjs

## Folder Structure
```
src/
├── app/
│   ├── api/
│   │   ├── login/route.ts
│   │   ├── logout/route.ts
│   │   ├── signup/route.ts
│   │   ├── users/me/route.ts
│   │   ├── verifyemail/route.ts
│   │   ├── forgotpassword/route.ts
│   │   └── resetpassword/route.ts
│   ├── login/page.tsx
│   ├── signup/page.tsx
│   ├── profile/[id]/page.tsx
│   ├── verifyemail/page.tsx
│   ├── forgotpassword/page.tsx
│   └── resetpassword/page.tsx
├── dbConfig/
│   └── dbConfig.ts
├── helpers/
│   └── mailer.ts
└── models/
    └── userModel.js
middleware.ts
```

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create `.env.local` file in root
```env
MONGO_URI=your_mongodb_connection_string
TOKEN_SECRET=your_jwt_secret
DOMAIN=http://localhost:3000
MAILTRAP_HOST=sandbox.smtp.mailtrap.io
MAILTRAP_PORT=2525
MAILTRAP_USER=your_mailtrap_user
MAILTRAP_PASS=your_mailtrap_password
```

### 4. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## API Routes

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/signup` | Register a new user |
| POST | `/api/login` | Login user |
| GET | `/api/logout` | Logout user |
| GET | `/api/users/me` | Get logged in user |
| GET | `/api/verifyemail` | Verify email token |
| POST | `/api/forgotpassword` | Send reset email |
| POST | `/api/resetpassword` | Reset password |

## Environment Variables

| Variable | Description |
|----------|-------------|
| `MONGO_URI` | MongoDB Atlas connection string |
| `TOKEN_SECRET` | JWT secret key |
| `DOMAIN` | App domain (e.g. http://localhost:3000) |
| `MAILTRAP_HOST` | Mailtrap SMTP host |
| `MAILTRAP_PORT` | Mailtrap SMTP port |
| `MAILTRAP_USER` | Mailtrap username |
| `MAILTRAP_PASS` | Mailtrap password |



