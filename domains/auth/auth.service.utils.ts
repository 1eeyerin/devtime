import {
  ValidationError,
  BackendApiError,
  ERROR_MESSAGES,
} from "@/shared/api/error";
import { LoginRequest } from "@/domains/auth";
import { getRefreshToken } from "@/shared/auth";

const AUTH_ERROR_FALLBACKS = {
  LOGIN: ERROR_MESSAGES.AUTH.LOGIN_FAILED,
  REFRESH: ERROR_MESSAGES.AUTH.REFRESH_FAILED,
} as const;

type AuthOperation = keyof typeof AUTH_ERROR_FALLBACKS;

export const validateLoginCredentials = (credentials: LoginRequest) => {
  const { email, password } = credentials;

  if (!email || !password) {
    throw new ValidationError(
      ERROR_MESSAGES.VALIDATION.EMAIL_PASSWORD_REQUIRED
    );
  }

  return { email, password };
};

export const requireRefreshToken = async (
  refreshToken: string | undefined,
  fetchToken: typeof getRefreshToken
) => {
  const token = refreshToken || (await fetchToken());

  if (!token) {
    throw new ValidationError(ERROR_MESSAGES.VALIDATION.REFRESH_TOKEN_REQUIRED);
  }

  return token;
};

export const assertSuccessfulAuthResponse = <
  T extends { success: boolean; message?: string }
>(
  response: T,
  operation: AuthOperation,
  statusCode: number
) => {
  if (!response.success) {
    throw new BackendApiError(
      response.message || AUTH_ERROR_FALLBACKS[operation],
      statusCode,
      response
    );
  }

  return response;
};
