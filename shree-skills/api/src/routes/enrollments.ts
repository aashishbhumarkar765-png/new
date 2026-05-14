import { Router } from "express";
import { randomUUID } from "crypto";
import { prisma } from "../prisma";
import { requireAuth, AuthedRequest } from "../middleware/auth";
import { asyncHandler } from "../utils/asyncHandler";
import { badRequest, notFound } from "../utils/errors";
import { uuidSchema } from "../utils/validation";
import logger from "../utils/logger";
import { mockCourses, mockEnrollments } from "../mockData";

const router = Router();

router.post("/enroll/:courseId", requireAuth, asyncHandler(async (req: AuthedRequest, res) => {
  const courseIdParam = req.params.courseId;
  const courseId = Array.isArray(courseIdParam) ? courseIdParam[0] : courseIdParam;
  if (!courseId) {
    throw badRequest("Invalid course id");
  }
  const parsed = uuidSchema.safeParse(courseId);
  if (!parsed.success) {
    throw badRequest("Invalid course id");
  }

  try {
    const course = await prisma.course.findUnique({ where: { id: courseId } });
    if (!course) {
      const fallbackCourse = mockCourses.find((item) => item.id === courseId);
      if (!fallbackCourse) {
        throw notFound("Course not found");
      }
    }

    const enrollment = await prisma.enrollment.upsert({
      where: { userId_courseId: { userId: req.userId as string, courseId } },
      update: {},
      create: { userId: req.userId as string, courseId }
    });

    logger.info("User enrolled", { userId: req.userId, courseId });
    return res.json({ message: "Enrolled", enrollment });
  } catch (error) {
    if ((error as any).status === 404) throw error;
    const err = error as Error;
    logger.warn("Database unavailable for enrollment; using mock enrollment store", { error: err.message, userId: req.userId, courseId });
  }

  const course = mockCourses.find((item) => item.id === courseId);
  if (!course) {
    throw notFound("Course not found");
  }

  let enrollment = mockEnrollments.find((item) => item.userId === req.userId && item.courseId === courseId);
  if (!enrollment) {
    enrollment = {
      id: randomUUID(),
      userId: req.userId as string,
      courseId,
      createdAt: new Date()
    };
    mockEnrollments.push(enrollment);
  }

  logger.info("User enrolled in mock store", { userId: req.userId, courseId });
  return res.json({ message: "Enrolled", enrollment });
}));

export default router;
