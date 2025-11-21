import { authService, RefreshRequest } from "@/domains/auth";
import { successResponse, withApiHandler } from "@/shared/api";

export const POST = withApiHandler(async (request) => {
  const body: RefreshRequest = await request.json();
  const result = await authService.refresh(body.refreshToken);

  return successResponse(result);
});
