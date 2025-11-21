import { ERROR_MESSAGES } from "@/shared/api/error";

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export class ValidationError extends ApiError {
  constructor(message: string = ERROR_MESSAGES.VALIDATION.DEFAULT) {
    super(message, 400, "VALIDATION_ERROR");
    this.name = "ValidationError";
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message: string = ERROR_MESSAGES.AUTH.UNAUTHORIZED) {
    super(message, 401, "UNAUTHORIZED");
    this.name = "UnauthorizedError";
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string = ERROR_MESSAGES.NOT_FOUND.DEFAULT) {
    super(message, 404, "NOT_FOUND");
    this.name = "NotFoundError";
  }
}

export class BackendApiError extends ApiError {
  constructor(
    message: string,
    statusCode: number,
    public backendResponse?: unknown
  ) {
    super(message, statusCode, "BACKEND_API_ERROR");
    this.name = "BackendApiError";
  }
}

export class ConfigurationError extends ApiError {
  constructor(message: string = ERROR_MESSAGES.SERVER.CONFIGURATION) {
    super(message, 500, "CONFIGURATION_ERROR");
    this.name = "ConfigurationError";
  }
}
