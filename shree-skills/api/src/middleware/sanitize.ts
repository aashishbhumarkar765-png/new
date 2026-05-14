import { Request, Response, NextFunction } from "express";

function cleanValue(value: unknown): unknown {
  if (typeof value === "string") {
    return value.replace(/\0/g, "").trim();
  }
  if (Array.isArray(value)) {
    return value.map(cleanValue);
  }
  if (value && typeof value === "object") {
    const next: Record<string, unknown> = {};
    for (const [key, val] of Object.entries(value as Record<string, unknown>)) {
      next[key] = cleanValue(val);
    }
    return next;
  }
  return value;
}

export function sanitizeInputs(req: Request, _res: Response, next: NextFunction) {
  req.body = cleanValue(req.body);
  req.query = cleanValue(req.query) as Request["query"];
  req.params = cleanValue(req.params) as Request["params"];
  next();
}
