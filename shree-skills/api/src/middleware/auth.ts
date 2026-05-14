import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { unauthorized } from "../utils/errors";

export interface AuthedRequest extends Request {
  userId?: string;
}

export function requireAuth(req: AuthedRequest, res: Response, next: NextFunction) {
  const auth = req.headers.authorization || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
  if (!token) {
    return next(unauthorized("Missing token"));
  }
  try {
    const payload = verifyToken(token);
    req.userId = payload.userId;
    return next();
  } catch {
    return next(unauthorized("Invalid token"));
  }
}
