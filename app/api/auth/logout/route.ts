import { clearAuthCookies } from "@/shared/auth";
import {
  successResponse,
  withApiHandler,
  SUCCESS_MESSAGES,
} from "@/shared/api";

export const POST = withApiHandler(async () => {
  await clearAuthCookies();
  return successResponse(undefined, SUCCESS_MESSAGES.AUTH.LOGOUT);
});
