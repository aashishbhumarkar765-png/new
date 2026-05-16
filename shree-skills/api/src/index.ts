import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import logger from './utils/logger';

// Import routes
import healthRouter from './routes/health';
import authRouter from './routes/auth';
import coursesRouter from './routes/courses';
import blogsRouter from './routes/blogs';
import roadmapsRouter from './routes/roadmaps';
import enrollmentsRouter from './routes/enrollments';
import meRouter from './routes/me';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const WEB_ORIGIN = process.env.WEB_ORIGIN || 'http://localhost:3000';

// Startup/config helpers
import { prisma } from './prisma';

function missingEnvVars(required: string[]) {
  return required.filter((k) => !process.env[k]);
}

async function connectPrismaWithRetries(retries = 5, delayMs = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      await prisma.$connect();
      logger.info('Prisma connected');
      return;
    } catch (err: any) {
      const attempt = i + 1;
      logger.warn(`Prisma connect attempt ${attempt} failed: ${err?.message || err}`);
      if (attempt >= retries) throw err;
      const backoff = delayMs * Math.pow(2, i);
      logger.info(`Waiting ${backoff}ms before next attempt`);
      await new Promise((r) => setTimeout(r, backoff));
    }
  }
}

let server: ReturnType<typeof app.listen> | null = null;

async function gracefulShutdown(code = 0) {
  try {
    logger.info('Shutting down server...');
    if (server) {
      server.close(() => logger.info('HTTP server closed'));
    }
    await prisma.$disconnect();
    logger.info('Prisma disconnected');
  } catch (e: any) {
    logger.error('Error during shutdown', { error: e?.message || e });
  } finally {
    process.exit(code);
  }
}

// Validate required env in production
if (process.env.NODE_ENV === 'production') {
  const missing: string[] = [];
  if (!process.env.DATABASE_URL) missing.push('DATABASE_URL');
  if (!process.env.JWT_SECRET) missing.push('JWT_SECRET');
  if (missing.length) {
    logger.error('Missing required environment variables', { missing });
    // Exit so deployment fails fast and secrets are set
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}

// Middleware
// Security middlewares
app.use(helmet());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  standardHeaders: true,
  legacyHeaders: false
}));

app.use(cors({
  origin: WEB_ORIGIN,
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging
app.use((req, _res, next) => {
  logger.info(`${req.method} ${req.path}`, { ip: req.ip });
  next();
});

// Explicit health endpoints (Railway and uptime checks expect a quick root/health response)
app.get('/', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'Shree Skills API is running',
    status: 'healthy'
  });
});

app.get('/api/health', (_req, res) => {
  res.status(200).json({
    success: true,
    status: 'healthy'
  });
});

// API Routes
app.use('/api', healthRouter);
app.use('/api', authRouter);
app.use('/api', coursesRouter);
app.use('/api', blogsRouter);
app.use('/api', roadmapsRouter);
app.use('/api', enrollmentsRouter);
app.use('/api', meRouter);

// (root endpoint replaced by explicit health response above)

// 404 handler
app.use((_req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: 'The requested endpoint does not exist',
    status: 404
  });
});

// Error handler
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  logger.error('Unhandled error', { error: err.message, stack: err.stack });
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    status: err.status || 500
  });
});

// Start server (robust)
async function start() {
  // Validate required env in production
  if (process.env.NODE_ENV === 'production') {
    const missing: string[] = [];
    if (!process.env.DATABASE_URL) missing.push('DATABASE_URL');
    if (!process.env.JWT_SECRET) missing.push('JWT_SECRET');
    if (missing.length) {
      logger.error('Missing required environment variables', { missing });
      // Exit so deployment fails fast and secrets are set
      throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }
  }

  try {
    // Attempt to initialize Prisma with retries
    await connectPrismaWithRetries(5, 1000);
  } catch (err: any) {
    logger.error('Failed to connect to the database after retries', { error: err?.message || err });
    // In production, exit so the platform restarts the container
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }

  server = app.listen(PORT, () => {
    logger.info(`Shree Skills API running on http://localhost:${PORT}`);
    logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
    logger.info(`CORS enabled for: ${WEB_ORIGIN}`);
  });

  // Process-level handlers
  process.on('uncaughtException', (err) => {
    logger.error('uncaughtException', { error: (err as Error).message, stack: (err as Error).stack });
    gracefulShutdown(1);
  });

  process.on('unhandledRejection', (reason) => {
    logger.error('unhandledRejection', { reason });
    gracefulShutdown(1);
  });

  process.on('SIGTERM', () => gracefulShutdown(0));
  process.on('SIGINT', () => gracefulShutdown(0));
}

start().catch((err) => {
  logger.error('Failed to start server', { error: err?.message || err });
  process.exit(1);
});

export default app;
