import { Router } from "express";
import { mockBlogs, mockCourses, mockRoadmaps } from "../mockData";

const router = Router();

router.get("/health", (_req, res) => {
  res.json({ ok: true });
});

router.get("/status", (_req, res) => {
  res.json({
    ok: true,
    mode: "database-first-with-mock-fallback",
    catalog: {
      courses: mockCourses.length,
      blogs: mockBlogs.length,
      roadmaps: mockRoadmaps.length
    }
  });
});

export default router;
