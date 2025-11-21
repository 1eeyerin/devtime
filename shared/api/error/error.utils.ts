import { NextResponse } from "next/server";
import {
  unauthorizedResponse,
  serverErrorResponse,
  errorResponse,
  validationErrorResponse,
} from "@/shared/api";
import {
  ApiError,
  ValidationError,
  UnauthorizedError,
} from "@/shared/api/error";

export const isKnownError = (error: unknown): error is ApiError => {
  return error instanceof ApiError;
};

export const handleKnownError = (error: ApiError): NextResponse => {
  if (error instanceof ValidationError) {
    return validationErrorResponse(error.message);
  }

  if (error instanceof UnauthorizedError) {
    return unauthorizedResponse(error.message);
  }

  return errorResponse(error.message, error.statusCode);
};

export const handleUnknownError = (error: unknown): NextResponse => {
  if (error instanceof Error) {
    console.error("Unexpected error:", error);
    return serverErrorResponse(error.message);
  }

  console.error("Unknown error:", error);
  return serverErrorResponse();
};
