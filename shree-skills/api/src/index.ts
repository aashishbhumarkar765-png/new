import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
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

// Middleware
app.use(cors({
  origin: WEB_ORIGIN,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, _res, next) => {
  logger.info(`${req.method} ${req.path}`, { ip: req.ip });
  next();
});

// API Routes
app.use('/api', healthRouter);
app.use('/api', authRouter);
app.use('/api', coursesRouter);
app.use('/api', blogsRouter);
app.use('/api', roadmapsRouter);
app.use('/api', enrollmentsRouter);
app.use('/api', meRouter);

// Root endpoint
app.get('/', (_req, res) => {
  res.json({
    name: 'Shree Skills API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth/*',
      courses: '/api/courses',
      blogs: '/api/blogs',
      roadmaps: '/api/roadmaps',
      me: '/api/me'
    }
  });
});

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

// Start server
app.listen(PORT, () => {
  logger.info(`Shree Skills API running on http://localhost:${PORT}`);
  logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
  logger.info(`CORS enabled for: ${WEB_ORIGIN}`);
});

export default app;
