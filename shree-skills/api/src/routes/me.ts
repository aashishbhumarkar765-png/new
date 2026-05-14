import { Router } from "express";
import { prisma } from "../prisma";
import { requireAuth, AuthedRequest } from "../middleware/auth";
import { asyncHandler } from "../utils/asyncHandler";
import { profileSchema } from "../utils/validation";
import { badRequest } from "../utils/errors";
import logger from "../utils/logger";
import { mockCourses, mockEnrollments, mockUsers } from "../mockData";

const router = Router();

router.get("/auth/me", requireAuth, asyncHandler(async (req: AuthedRequest, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: { id: true, email: true, createdAt: true }
    });
    logger.info("Fetched current user", { userId: req.userId });
    return res.json(user);
  } catch (error) {
    const err = error as Error;
    logger.warn("Database unavailable for current user; using mock auth store", { error: err.message, userId: req.userId });
    const user = mockUsers.find((item) => item.id === req.userId);
    return res.json(user ? { id: user.id, email: user.email, createdAt: user.createdAt } : null);
  }
}));

router.get("/me/enrollments", requireAuth, asyncHandler(async (req: AuthedRequest, res) => {
  try {
    const enrollments = await prisma.enrollment.findMany({
      where: { userId: req.userId },
      include: { course: true }
    });
    return res.json(enrollments);
  } catch (error) {
    const err = error as Error;
    logger.warn("Database unavailable for enrollments; using mock enrollment store", { error: err.message, userId: req.userId });
    const enrollments = mockEnrollments
      .filter((item) => item.userId === req.userId)
      .map((item) => ({
        ...item,
        course: mockCourses.find((course) => course.id === item.courseId)
      }))
      .filter((item) => item.course);
    return res.json(enrollments);
  }
}));

/*
router.get("/me/profile", requireAuth, asyncHandler(async (req: AuthedRequest, res) => {
  const profile = await prisma.userProfile.findUnique({
    where: { userId: req.userId },
    select: { id: true, name: true, headline: true, avatarUrl: true, createdAt: true, updatedAt: true }
  });
  res.json(profile);
}));

router.put("/me/profile", requireAuth, asyncHandler(async (req: AuthedRequest, res) => {
  const parsed = profileSchema.safeParse(req.body);
  if (!parsed.success) {
    throw badRequest("Invalid profile details", { issues: parsed.error.issues });
  }

  const profile = await prisma.userProfile.upsert({
    where: { userId: req.userId as string },
    update: parsed.data,
    create: { userId: req.userId as string, ...parsed.data }
  });

  res.json(profile);
}));
*/

export default router;
