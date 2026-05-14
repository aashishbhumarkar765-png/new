import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";
import { ApiError } from "../utils/errors";

export function errorHandler(err: unknown, req: Request, res: Response, _next: NextFunction) {
  const fallback = new ApiError(500, "INTERNAL_ERROR", "Something went wrong");
  const apiError = err instanceof ApiError ? err : fallback;

  const message = apiError.message || fallback.message;
  const status = apiError.status || fallback.status;
  const code = apiError.code || fallback.code;

  logger.error("Request failed", {
    method: req.method,
    path: req.path,
    status,
    code,
    message,
    error: err instanceof Error ? err.stack : err
  });

  res.status(status).json({
    message,
    code,
    ...(apiError.details ? { details: apiError.details } : {})
  });
}
