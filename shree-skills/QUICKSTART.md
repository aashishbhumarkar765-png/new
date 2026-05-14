# 🎯 Quick Start Guide

Welcome to **Shree Skills**! This guide will help you get the platform running in minutes.

## ⚡ Super Quick Start (Windows)

### Option 1: Automated Setup (Recommended)

```bash
# 1. Navigate to the API folder
cd api

# 2. Install dependencies (if not already done)
npm install

# 3. Run the automated setup script
setup-database.bat

# 4. Start the backend
npm run dev
```

Open a new terminal:
```bash
# 5. Navigate to web folder and start frontend
cd web
npm install
npm run dev
```

### Option 2: Manual Setup

#### Step 1: Configure Database

1. Open `api/.env` file
2. Update the `DATABASE_URL` with your Supabase connection string:
   ```env
   DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db.xxx.supabase.co:5432/postgres?schema=public&sslmode=require"
   ```

#### Step 2: Setup Database

```bash
cd api
npm install
npm run prisma:generate
npm run prisma:push
npm run seed:enhanced
```

#### Step 3: Start Servers

Terminal 1 (Backend):
```bash
cd api
npm run dev
```

Terminal 2 (Frontend):
```bash
cd web
npm run dev
```

## ✅ Verify Everything Works

Run the verification script:
```bash
node verify-system.js
```

Or manually check:
- Backend Health: http://localhost:4000/api/health
- Frontend: http://localhost:3000

## 🔑 Test Credentials

```
Email: admin@shreeskills.com
Password: password123
```

## 📚 Available Commands

### Backend (api/)
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run db:setup` - Quick database setup
- `npm run seed:enhanced` - Reseed database

### Frontend (web/)
- `npm run dev` - Start development server
- `npm run build` - Build for production  
- `npm start` - Start production server

## 🐛 Common Issues

### "Can't reach database server"
- ✅ Check `DATABASE_URL` in `api/.env`
- ✅ Ensure Supabase project is not paused
- ✅ Verify password is correct

### "Table does not exist"
- ✅ Run: `cd api && npm run prisma:push`
- ✅ Then run: `npm run seed:enhanced`

### "Connection refused" errors
- ✅ Make sure backend is running on port 4000
- ✅ Make sure frontend is running on port 3000
- ✅ Check no other apps are using these ports

## 🚀 Next Steps

1. Explore the codebase
2. Read `README.md` for detailed documentation
3. Check `FIXES.md` if you encounter issues
4. Customize the platform for your needs

## 📖 Documentation

- **Full README**: `README.md`
- **Fix Guide**: `FIXES.md`  
- **API Docs**: Check `/api/src/routes` folder

## 🎉 You're Ready!

Your platform is now running:
- 🏠 Frontend: http://localhost:3000
- ⚙️ Backend API: http://localhost:4000
- 📊 Database: Connected to Supabase

Happy coding! 🚀
