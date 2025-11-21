import { handleApiError } from "@/shared/api/error";
import { NextRequest, NextResponse } from "next/server";

type RouteHandler = (request: NextRequest) => Promise<NextResponse>;

export const withApiHandler = (handler: RouteHandler) => {
  return async (request: NextRequest): Promise<NextResponse> => {
    try {
      return await handler(request);
    } catch (error) {
      return handleApiError(error);
    }
  };
};
