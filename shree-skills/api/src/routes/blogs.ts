import { Router } from "express";
import { prisma } from "../prisma";
import logger from "../utils/logger";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError, badRequest } from "../utils/errors";
import { slugSchema } from "../utils/validation";
import { limitItems, mockBlogs, sortByCreatedAtDesc } from "../mockData";

const router = Router();
const MAX_LIST_LIMIT = 50;

const parseLimit = (value: unknown) => {
  const raw = Array.isArray(value) ? value[0] : value;
  if (!raw) return undefined;
  const parsed = Number.parseInt(String(raw), 10);
  if (Number.isNaN(parsed)) return undefined;
  return Math.min(Math.max(parsed, 1), MAX_LIST_LIMIT);
};

router.get("/blogs", asyncHandler(async (req, res) => {
  const take = parseLimit(req.query.limit);
  try {
    logger.info("Fetching blogs list", { ip: req.ip });
    const blogs = await prisma.blog.findMany({
      select: {
        title: true,
        slug: true,
        excerpt: true,
        tags: true,
        readTime: true,
        date: true,
        hero: true
      },
      orderBy: { createdAt: "desc" },
      take
    });

    logger.info(`Returning ${blogs.length} blogs`);
    return res.json(blogs || []);
  } catch (error) {
    if (error instanceof ApiError) throw error;
    const err = error as Error;
    logger.warn("Database unavailable for blogs; using mock posts", { error: err.message });
    const blogs = limitItems(sortByCreatedAtDesc(mockBlogs), take).map(({ title, slug, excerpt, tags, readTime, date, hero }) => ({
      title,
      slug,
      excerpt,
      tags,
      readTime,
      date,
      hero
    }));
    return res.json(blogs);
  }
}));

router.get("/blogs/:slug", asyncHandler(async (req, res) => {
  try {
    const slugParam = req.params.slug;
    const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam;
    if (!slug) {
      throw badRequest("Invalid blog slug");
    }
    logger.info("Fetching blog by slug", { slug, ip: req.ip });

    const parsedSlug = slugSchema.safeParse(slug);
    if (!parsedSlug.success) {
      throw badRequest("Invalid blog slug");
    }

    const blog = await prisma.blog.findUnique({
      where: { slug }
    });

    if (!blog) {
      const fallbackBlog = mockBlogs.find((item) => item.slug === slug);
      if (!fallbackBlog) {
        logger.warn("Blog not found", { slug });
        return res.status(404).json({ message: "Blog not found", code: "BLOG_NOT_FOUND" });
      }
      logger.info("Blog found in mock posts", { slug, id: fallbackBlog.id });
      return res.json(fallbackBlog);
    }

    logger.info("Blog found", { slug, id: blog.id });
    return res.json(blog);
  } catch (error) {
    if (error instanceof ApiError) throw error;
    const err = error as Error;
    const slugParam = req.params.slug;
    const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam;
    logger.warn("Database unavailable for blog detail; using mock posts", { error: err.message, slug });

    const fallbackBlog = mockBlogs.find((item) => item.slug === slug);
    if (!fallbackBlog) {
      return res.status(404).json({ message: "Blog not found", code: "BLOG_NOT_FOUND" });
    }
    return res.json(fallbackBlog);
  }
}));

export default router;
