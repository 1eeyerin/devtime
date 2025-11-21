import { ERROR_MESSAGES } from "@/shared/api/error";
import { NextResponse } from "next/server";

type ApiResponse<T = unknown> = {
  success: boolean;
  message?: string;
  data?: T;
};

export const successResponse = <T>(
  data?: T,
  message?: string,
  status: number = 200
): NextResponse<ApiResponse<T>> => {
  const response: ApiResponse<T> = {
    success: true,
  };

  if (message) {
    response.message = message;
  }

  if (data) {
    response.data = data;
  }

  return NextResponse.json(response, { status });
};

export const errorResponse = (
  message: string,
  status: number = 500
): NextResponse<ApiResponse> =>
  NextResponse.json(
    {
      success: false,
      message,
    },
    { status }
  );

const DEFAULT_VALIDATION_MESSAGE = ERROR_MESSAGES.VALIDATION.DEFAULT;
const DEFAULT_UNAUTHORIZED_MESSAGE = ERROR_MESSAGES.AUTH.UNAUTHORIZED;
const DEFAULT_SERVER_ERROR_MESSAGE = ERROR_MESSAGES.SERVER.DEFAULT;

export const validationErrorResponse = (
  message: string = DEFAULT_VALIDATION_MESSAGE
): NextResponse<ApiResponse> => errorResponse(message, 400);

export const unauthorizedResponse = (
  message: string = DEFAULT_UNAUTHORIZED_MESSAGE
): NextResponse<ApiResponse> => errorResponse(message, 401);

export const serverErrorResponse = (
  message: string = DEFAULT_SERVER_ERROR_MESSAGE
): NextResponse<ApiResponse> => errorResponse(message, 500);
