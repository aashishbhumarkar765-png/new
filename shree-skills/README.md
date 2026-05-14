# 🎓 Shree Skills - Full-Stack Learning Platform

A modern, production-ready learning platform built with Next.js, Express, PostgreSQL (Supabase), and Prisma.

> **📊 Current Status**: ⚠️ Database configuration required. See [ENHANCEMENT_STATUS.md](./ENHANCEMENT_STATUS.md) for details.
>
> **🚀 Quick Start**: Run `STATUS.bat` to see your setup status, or check [QUICKSTART.md](./QUICKSTART.md)

## ✨ Features

- 🎯 **Comprehensive Course Catalog** - Browse and enroll in programming courses
- 📝 **Tech Blog** - Articles and tutorials on programming and tech
- 🗺️ **Learning Roadmaps** - Structured paths for skill development
- 🔐 **Authentication** - Secure JWT-based auth with bcrypt
- 📱 **Responsive Design** - Works seamlessly on all devices
- ⚡ **High Performance** - Optimized for speed and SEO
- 🎨 **Modern UI** - Beautiful design with Tailwind CSS and Framer Motion

## 🚀 Tech Stack

### Frontend
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Headless UI, Lucide Icons
- **Animations:** Framer Motion
- **Data Fetching:** SWR

### Backend
- **Runtime:** Node.js
- **Framework:** Express
- **Language:** TypeScript
- **Database:** PostgreSQL (Supabase)
- **ORM:** Prisma
- **Authentication:** JWT + bcrypt
- **Logging:** Winston

## 📋 Prerequisites

- Node.js 18+ and npm/pnpm
- PostgreSQL database (Supabase recommended)
- Git

## 🛠️ Installation & Setup

### 🚀 Quick Setup (Windows - Recommended)

**Run the automated setup script:**

```bash
cd api
setup-database.bat
```

This will:
1. Check your environment configuration
2. Generate Prisma Client
3. Create database tables
4. Seed sample data

Then start the servers:
```bash
# Terminal 1 - Backend
cd api
npm run dev

# Terminal 2 - Frontend
cd web  
npm run dev
```

### 📋 Manual Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd shree-skills
```

### 2. Backend Setup

```bash
cd api

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your database credentials and JWT secret

# Generate Prisma Client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# Seed the database
npm run seed:enhanced

# Start development server
npm run dev
```

The API will run on `http://localhost:4000`

### 3. Frontend Setup

```bash
cd ../web

# Install dependencies
npm install

# Configure environment variables
cp .env.local.example .env.local
# Edit .env.local with API URL

# Start development server
npm run dev
```

The web app will run on `http://localhost:3000`

## 🔧 Environment Variables

### Backend (`api/.env`)

```env
PORT=4000
WEB_ORIGIN=http://localhost:3000
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public&sslmode=require"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
```

### Frontend (`web/.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 📦 Available Scripts

### Backend (api/)

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run prisma:generate` - Generate Prisma Client
- `npm run prisma:migrate` - Run database migrations
- `npm run seed:enhanced` - Seed database with sample data

### Frontend (web/)

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🗄️ Database Schema

- **User** - User accounts with authentication
- **Course** - Course information with resources
- **Enrollment** - User course enrollments
- **Blog** - Blog posts and articles
- **Roadmap** - Learning roadmaps with milestones

## 🔐 Test Credentials

After seeding the database:

```
Email: admin@shreeskills.com
Password: password123
```

## 📁 Project Structure

```
shree-skills/
├── api/                    # Backend (Express + Prisma)
│   ├── prisma/
│   │   ├── schema.prisma  # Database schema
│   │   ├── migrations/    # Database migrations
│   │   └── seed-enhanced.ts # Database seeding
│   ├── src/
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Express middleware
│   │   └── utils/         # Utilities
│   └── logs/              # Application logs
│
└── web/                    # Frontend (Next.js)
    ├── src/
    │   ├── app/           # Next.js App Router pages
    │   ├── components/    # React components
    │   └── lib/           # Utilities and configs
    └── public/            # Static assets
```

## 🚢 Deployment

### Backend (Vercel/Railway/Render)

1. Set environment variables in your hosting platform
2. Connect your repository
3. Deploy with: `npm run build && npm start`

### Frontend (Vercel - Recommended)

1. Connect your repository to Vercel
2. Set `NEXT_PUBLIC_API_URL` environment variable
3. Deploy automatically on push

## 🔍 API Endpoints

### Public Routes
- `GET /api/health` - Health check
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/courses` - Get all courses
- `GET /api/courses/:slug` - Get course by slug
- `GET /api/blogs` - Get all blogs
- `GET /api/blogs/:slug` - Get blog by slug
- `GET /api/roadmaps` - Get all roadmaps
- `GET /api/roadmaps/:slug` - Get roadmap by slug

### Protected Routes (Require JWT)
- `GET /api/me` - Get current user
- `POST /api/enrollments` - Enroll in a course
- `GET /api/enrollments` - Get user enrollments

## 🎨 UI Components

The project uses:
- Headless UI for accessible components
- Tailwind CSS for styling
- Framer Motion for animations
- Lucide React for icons

## SEO Optimization

- ✅ Meta tags for all pages
- ✅ Open Graph tags
- ✅ Twitter Card tags
- ✅ JSON-LD structured data
- ✅ Sitemap generation
- ✅ Robots.txt
- ✅ Semantic HTML

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- CORS configuration
- Input validation and sanitization
- SQL injection protection (Prisma)
- XSS protection headers

## 📈 Performance

- Server-side rendering (SSR)
- Static generation where possible
- Image optimization with Next.js Image
- Code splitting
- Lazy loading
- Bundle optimization

## 🐛 Troubleshooting

### Database Connection Issues

1. Check DATABASE_URL format
2. Ensure Supabase project is active
3. Verify connection pooling settings
4. Check firewall/network restrictions

### Migration Errors

```bash
# Reset database (⚠️ Deletes all data)
npx prisma migrate reset

# Generate fresh migration
npx prisma migrate dev --name init
```

### Build Errors

```bash
# Clear Next.js cache
rm -rf .next

# Clear node_modules
rm -rf node_modules package-lock.json
npm install
```

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues and questions, please use the GitHub Issues page.

---

**Built with ❤️ by Shree Skills Team**
