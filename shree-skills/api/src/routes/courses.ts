import { Router } from "express";
import { prisma } from "../prisma";
import logger from "../utils/logger";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError, badRequest } from "../utils/errors";
import { slugSchema } from "../utils/validation";
import { limitItems, mockCourses, publicCourse, sortByCreatedAtDesc } from "../mockData";

const router = Router();
const MAX_LIST_LIMIT = 50;

const parseLimit = (value: unknown) => {
  const raw = Array.isArray(value) ? value[0] : value;
  if (!raw) return undefined;
  const parsed = Number.parseInt(String(raw), 10);
  if (Number.isNaN(parsed)) return undefined;
  return Math.min(Math.max(parsed, 1), MAX_LIST_LIMIT);
};

router.get("/courses", asyncHandler(async (req, res) => {
  const take = parseLimit(req.query.limit);
  try {
    logger.info('Fetching courses list', { ip: req.ip });
    const courses = await prisma.course.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        level: true,
        price: true,
        thumbnail: true
      },
      orderBy: { createdAt: 'desc' },
      take
    });

    logger.info(`Returning ${courses.length} courses`);
    return res.json(courses || []);
  } catch (error) {
    if (error instanceof ApiError) throw error;
    const err = error as Error;
    logger.warn('Database unavailable for courses; using mock catalog', { error: err.message });
    const courses = limitItems(sortByCreatedAtDesc(mockCourses), take).map(publicCourse);
    return res.json(courses);
  }
}));

router.get("/courses/:slug", asyncHandler(async (req, res) => {
  try {
    const slugParam = req.params.slug;
    const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam;
    if (!slug) {
      throw badRequest("Invalid course slug");
    }
    logger.info('Fetching course by slug', { slug, ip: req.ip });

    const parsedSlug = slugSchema.safeParse(slug);
    if (!parsedSlug.success) {
      throw badRequest("Invalid course slug");
    }

    const course = await prisma.course.findUnique({
      where: { slug },
      include: {
        enrollments: {
          select: { id: true, userId: true, createdAt: true }
        }
      }
    });

    if (!course) {
      const fallbackCourse = mockCourses.find((item) => item.slug === slug);
      if (!fallbackCourse) {
        logger.warn('Course not found', { slug });
        return res.status(404).json({ message: "Course not found" });
      }
      logger.info('Course found in mock catalog', { slug, id: fallbackCourse.id });
      return res.json({ ...fallbackCourse, enrollments: [] });
    }

    logger.info('Course found', { slug, id: course.id });
    return res.json(course);
  } catch (error) {
    if (error instanceof ApiError) throw error;
    const err = error as Error;
    const slugParam = req.params.slug;
    const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam;
    logger.warn('Database unavailable for course detail; using mock catalog', { error: err.message, slug });

    const fallbackCourse = mockCourses.find((item) => item.slug === slug);
    if (!fallbackCourse) {
      return res.status(404).json({ message: "Course not found" });
    }
    return res.json({ ...fallbackCourse, enrollments: [] });
  }
}));

export default router;
