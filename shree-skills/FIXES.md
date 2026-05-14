# 🔧 Shree Skills - Complete Fix Guide

## Critical Issues Identified

### 1. Database Connection ❌
- **Issue**: Using localhost PostgreSQL instead of Supabase
- **Error**: Can't reach database server at `db.pnbkjljeecxylgxgrnqr.supabase.co:5432`
- **Status**: DATABASE_URL needs to be updated

### 2. Missing Database Tables ❌
- **Issue**: Tables Blog, Roadmap don't exist in database
- **Issue**: Column Course.resources doesn't exist
- **Status**: Database migration needs to be run

### 3. Error Logs ⚠️
- **Issue**: 62 errors logged, mostly database connection failures
- **Status**: Will be resolved after fixing database issues

## 🚀 Fix Instructions

### Step 1: Set Up Supabase Database

1. **Get your Supabase connection string**:
   - Go to your Supabase project: https://supabase.com/dashboard
   - Navigate to: Settings > Database
   - Find "Connection string" section
   - Copy the "Connection pooling" URL (recommended for production)
   - It should look like: `postgresql://postgres:[YOUR-PASSWORD]@db.xxx.supabase.co:5432/postgres`

2. **Update the DATABASE_URL** in `api/.env`:
   ```env
   DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.pnbkjljeecxylgxgrnqr.supabase.co:5432/postgres?schema=public&sslmode=require"
   ```
   
   Replace `[YOUR-PASSWORD]` with your actual database password.

### Step 2: Run Database Migrations

```bash
cd api

# Generate Prisma Client
npm run prisma:generate

# Push schema to database (creates all tables)
npx prisma db push

# OR run migrations
npx prisma migrate deploy

# Seed the database with sample data
npm run seed:enhanced
```

### Step 3: Clear Error Logs

```bash
# Clear the error log
echo "" > api/logs/error.log
echo "" > api/logs/combined.log
```

### Step 4: Restart Both Servers

```bash
# Terminal 1 - Backend
cd api
npm run dev

# Terminal 2 - Frontend
cd web
npm run dev
```

### Step 5: Verify Everything Works

1. **Backend Health Check**:
   - Open: http://localhost:4000/api/health
   - Should return: `{"status":"healthy"}`

2. **Test API Endpoints**:
   - Courses: http://localhost:4000/api/courses
   - Blogs: http://localhost:4000/api/blogs
   - Roadmaps: http://localhost:4000/api/roadmaps

3. **Frontend Check**:
   - Open: http://localhost:3000
   - All pages should load without errors

## 🎯 Quick Fix Commands (Run These in Order)

```bash
# 1. Update DATABASE_URL in api/.env first!

# 2. Setup database
cd api
npm run prisma:generate
npx prisma db push
npm run seed:enhanced

# 3. Clear logs
echo. > logs/error.log
echo. > logs/combined.log

# 4. Start backend
npm run dev
```

In a new terminal:
```bash
# 5. Start frontend
cd web
npm run dev
```

## ✅ Expected Results

After following these steps:
- ✅ Database connection successful
- ✅ All tables created (User, Course, Enrollment, Blog, Roadmap)
- ✅ Sample data seeded
- ✅ No errors in logs
- ✅ Backend API responding
- ✅ Frontend loading correctly

## 🔍 Troubleshooting

### If database connection still fails:
1. Check Supabase project is active (not paused)
2. Verify database password is correct
3. Ensure `sslmode=require` is in the connection string
4. Check firewall/network settings

### If tables still don't exist:
```bash
cd api
npx prisma migrate reset  # ⚠️ This will delete all data
npx prisma migrate dev --name reinit
npm run seed:enhanced
```

### If Prisma Client errors:
```bash
cd api
rm -rf node_modules/.prisma
npm run prisma:generate
```

## 📋 Checklist

- [ ] Updated DATABASE_URL with valid Supabase connection string
- [ ] Generated Prisma Client
- [ ] Pushed database schema
- [ ] Seeded database with sample data
- [ ] Cleared error logs
- [ ] Backend server running without errors
- [ ] Frontend server running without errors
- [ ] Can access all API endpoints
- [ ] Can browse website at localhost:3000

## 🎉 Once Fixed

The platform will have:
- ✅ Full database connectivity
- ✅ Working authentication system
- ✅ Courses, blogs, and roadmaps loading
- ✅ User enrollment functionality
- ✅ Clean error logs
- ✅ Production-ready backend
- ✅ Beautiful, responsive frontend

---

**Need Help?** Check the error logs at `api/logs/error.log` for specific error messages.
