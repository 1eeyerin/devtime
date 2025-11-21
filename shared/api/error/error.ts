import {
  handleKnownError,
  handleUnknownError,
  isKnownError,
} from "@/shared/api/error";
import { NextResponse } from "next/server";

export const handleApiError = (error: unknown): NextResponse => {
  if (isKnownError(error)) {
    return handleKnownError(error);
  }

  return handleUnknownError(error);
};
