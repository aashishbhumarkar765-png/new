import { Router } from "express";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import { prisma } from "../prisma";
import { signToken } from "../utils/jwt";
import { ZodIssue } from "zod";
import { loginSchema, signupSchema } from "../utils/validation";
import { asyncHandler } from "../utils/asyncHandler";
import { badRequest, conflict, unauthorized } from "../utils/errors";
import logger from "../utils/logger";
import { mockUsers } from "../mockData";

const router = Router();

function validationMessage(issues: ZodIssue[]) {
  for (const issue of issues) {
    const i = issue as any;
    const field = i.path[0];
    if (field === "email") {
      if (i.code === "invalid_string" && i.validation === "email") return "Invalid email";
      return "Email is required";
    }
    if (field === "password") {
      if (i.code === "too_small") return "Password must be at least 8 characters";
      return "Password is required";
    }
  }
  return "Invalid input";
}

router.post("/auth/signup", asyncHandler(async (req, res) => {
  const parsed = signupSchema.safeParse(req.body);
  if (!parsed.success) {
    throw badRequest(validationMessage(parsed.error.issues));
  }

  const { email, password } = parsed.data;
  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      throw conflict("Email already registered");
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({ data: { email, passwordHash } });
    const token = signToken(user.id);
    logger.info("User signed up", { userId: user.id });
    return res.json({ token, user: { id: user.id, email: user.email } });
  } catch (error) {
    if ((error as any).status === 409) throw error;
    const err = error as Error;
    logger.warn("Database unavailable for signup; using mock auth store", { error: err.message });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const existingMock = mockUsers.find((user) => user.email.toLowerCase() === email.toLowerCase());
  if (existingMock) {
    throw conflict("Email already registered");
  }
  const user = {
    id: randomUUID(),
    email,
    passwordHash,
    createdAt: new Date()
  };
  mockUsers.push(user);
  const token = signToken(user.id);
  logger.info("User signed up in mock auth store", { userId: user.id });
  return res.json({ token, user: { id: user.id, email: user.email } });
}));

router.post("/auth/login", asyncHandler(async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    throw badRequest(validationMessage(parsed.error.issues));
  }

  const { email, password } = parsed.data;
  let user = null;
  try {
    user = await prisma.user.findUnique({ where: { email } });
  } catch (error) {
    const err = error as Error;
    logger.warn("Database unavailable for login; using mock auth store", { error: err.message });
    user = mockUsers.find((item) => item.email.toLowerCase() === email.toLowerCase()) ?? null;
  }

  if (!user) {
    throw unauthorized("Invalid credentials");
  }

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) {
    throw unauthorized("Invalid credentials");
  }

  const token = signToken(user.id);
  logger.info("User logged in", { userId: user.id });
  return res.json({ token, user: { id: user.id, email: user.email } });
}));

export default router;
