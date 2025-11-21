import { authService, LoginRequest } from "@/domains/auth";
import { successResponse, withApiHandler } from "@/shared/api";

export const POST = withApiHandler(async (request) => {
  const body: LoginRequest = await request.json();
  const result = await authService.login(body);

  return successResponse(result, result.message);
});
