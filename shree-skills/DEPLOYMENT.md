Deployment checklist

1. Create secrets locally (do NOT commit):
   - shree-skills/api/.env (DATABASE_URL, JWT_SECRET, WEB_ORIGIN)
   - shree-skills/web/.env.local (NEXT_PUBLIC_API_BASE_URL, NEXT_PUBLIC_SITE_URL)

2. Backend (Railway):
   - Set env vars: DATABASE_URL, JWT_SECRET, WEB_ORIGIN, NODE_ENV=production
   - Build: npm install && npm run build
   - Start: npm start

3. Frontend (Vercel):
   - Set env vars: NEXT_PUBLIC_API_BASE_URL, NEXT_PUBLIC_SITE_URL
   - Build & Deploy via Vercel dashboard

4. CI: GitHub Actions will build both frontend and backend on push to main.
