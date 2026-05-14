import { Router } from "express";
import { prisma } from "../prisma";
import logger from "../utils/logger";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError, badRequest } from "../utils/errors";
import { slugSchema } from "../utils/validation";
import { limitItems, mockRoadmaps, sortByCreatedAtDesc } from "../mockData";

const router = Router();
const MAX_LIST_LIMIT = 50;

const parseLimit = (value: unknown) => {
  const raw = Array.isArray(value) ? value[0] : value;
  if (!raw) return undefined;
  const parsed = Number.parseInt(String(raw), 10);
  if (Number.isNaN(parsed)) return undefined;
  return Math.min(Math.max(parsed, 1), MAX_LIST_LIMIT);
};

router.get("/roadmaps", asyncHandler(async (req, res) => {
  const take = parseLimit(req.query.limit);
  try {
    logger.info("Fetching roadmaps list", { ip: req.ip });
    const roadmaps = await prisma.roadmap.findMany({
      select: {
        slug: true,
        title: true,
        summary: true,
        duration: true,
        level: true,
        milestones: true
      },
      orderBy: { createdAt: "desc" },
      take
    });

    logger.info(`Returning ${roadmaps.length} roadmaps`);
    return res.json(roadmaps || []);
  } catch (error) {
    if (error instanceof ApiError) throw error;
    const err = error as Error;
    logger.warn("Database unavailable for roadmaps; using mock roadmaps", { error: err.message });
    const roadmaps = limitItems(sortByCreatedAtDesc(mockRoadmaps), take).map(({ slug, title, summary, duration, level, milestones }) => ({
      slug,
      title,
      summary,
      duration,
      level,
      milestones
    }));
    return res.json(roadmaps);
  }
}));

router.get("/roadmaps/:slug", asyncHandler(async (req, res) => {
  try {
    const slugParam = req.params.slug;
    const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam;
    if (!slug) {
      throw badRequest("Invalid roadmap slug");
    }
    logger.info("Fetching roadmap by slug", { slug, ip: req.ip });

    const parsedSlug = slugSchema.safeParse(slug);
    if (!parsedSlug.success) {
      throw badRequest("Invalid roadmap slug");
    }

    const roadmap = await prisma.roadmap.findUnique({
      where: { slug }
    });

    if (!roadmap) {
      const fallbackRoadmap = mockRoadmaps.find((item) => item.slug === slug);
      if (!fallbackRoadmap) {
        logger.warn("Roadmap not found", { slug });
        return res.status(404).json({ message: "Roadmap not found", code: "ROADMAP_NOT_FOUND" });
      }
      logger.info("Roadmap found in mock roadmaps", { slug, id: fallbackRoadmap.id });
      return res.json(fallbackRoadmap);
    }

    logger.info("Roadmap found", { slug, id: roadmap.id });
    return res.json(roadmap);
  } catch (error) {
    if (error instanceof ApiError) throw error;
    const err = error as Error;
    const slugParam = req.params.slug;
    const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam;
    logger.warn("Database unavailable for roadmap detail; using mock roadmaps", { error: err.message, slug });

    const fallbackRoadmap = mockRoadmaps.find((item) => item.slug === slug);
    if (!fallbackRoadmap) {
      return res.status(404).json({ message: "Roadmap not found", code: "ROADMAP_NOT_FOUND" });
    }
    return res.json(fallbackRoadmap);
  }
}));

export default router;
