@echo off
REM Database Setup Script for Windows
REM This script sets up the Shree Skills database

echo.
echo ========================================
echo   Shree Skills - Database Setup
echo ========================================
echo.

REM Check if .env exists
if not exist ".env" (
    echo ERROR: .env file not found!
    echo.
    echo Please create api\.env file with your database configuration.
    echo Example:
    echo DATABASE_URL="postgresql://postgres:password@db.xxx.supabase.co:5432/postgres?schema=public&sslmode=require"
    echo.
    pause
    exit /b 1
)

echo Step 1: Generating Prisma Client...
call npx prisma generate
if errorlevel 1 (
    echo ERROR: Failed to generate Prisma Client
    pause
    exit /b 1
)
echo ✓ Prisma Client generated
echo.

echo Step 2: Pushing schema to database...
set /p CONFIRM="This will create/update tables in your database. Continue? (Y/N): "
if /i not "%CONFIRM%"=="Y" (
    echo Setup cancelled
    pause
    exit /b 0
)

call npx prisma db push
if errorlevel 1 (
    echo ERROR: Failed to push schema to database
    echo.
    echo Troubleshooting:
    echo 1. Check your DATABASE_URL in .env file
    echo 2. Ensure Supabase project is active
    echo 3. Verify database password is correct
    pause
    exit /b 1
)
echo ✓ Database schema updated
echo.

echo Step 3: Seeding database...
set /p SEED="Seed database with sample data? (Y/N): "
if /i "%SEED%"=="Y" (
    call npm run seed:enhanced
    if errorlevel 1 (
        echo WARNING: Database seeding failed
        echo The database is set up but no sample data was added
    ) else (
        echo ✓ Database seeded successfully
    )
)
echo.

echo ========================================
echo   Setup Complete!
echo ========================================
echo.
echo Next Steps:
echo 1. Start backend: npm run dev
echo 2. Test API: http://localhost:4000/api/health
echo 3. Start frontend: cd ..\web ^&^& npm run dev
echo.
echo Test Credentials:
echo Email: admin@shreeskills.com
echo Password: password123
echo.
pause
