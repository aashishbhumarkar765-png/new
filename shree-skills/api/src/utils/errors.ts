export class ApiError extends Error {
  status: number;
  code: string;
  details?: Record<string, unknown>;

  constructor(status: number, code: string, message: string, details?: Record<string, unknown>) {
    super(message);
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export function badRequest(message: string, details?: Record<string, unknown>) {
  return new ApiError(400, "BAD_REQUEST", message, details);
}

export function unauthorized(message: string) {
  return new ApiError(401, "UNAUTHORIZED", message);
}

export function notFound(message: string, details?: Record<string, unknown>) {
  return new ApiError(404, "NOT_FOUND", message, details);
}

export function conflict(message: string) {
  return new ApiError(409, "CONFLICT", message);
}
