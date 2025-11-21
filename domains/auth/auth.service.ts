import { apiClient } from "@/shared/api/client";
import {
  LoginRequest,
  LoginResponse,
  LoginResult,
  RefreshResponse,
  RefreshResult,
  validateLoginCredentials,
  requireRefreshToken,
  assertSuccessfulAuthResponse,
} from "@/domains/auth";
import { setAuthCookies, getRefreshToken } from "@/shared/auth";
import { API_ENDPOINTS } from "@/shared/api";

type AuthServiceDeps = {
  client: typeof apiClient;
  setAuthCookies: typeof setAuthCookies;
  getRefreshToken: typeof getRefreshToken;
};

export const createAuthService = ({
  client,
  setAuthCookies: setCookies,
  getRefreshToken: getToken,
}: AuthServiceDeps) => {
  const login = async (credentials: LoginRequest): Promise<LoginResult> => {
    const { email, password } = validateLoginCredentials(credentials);

    const response = await client.post<LoginResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      { email, password }
    );

    const validResponse = assertSuccessfulAuthResponse(response, "LOGIN", 400);

    await setCookies(validResponse.accessToken, validResponse.refreshToken);

    return {
      message: validResponse.message,
      isFirstLogin: validResponse.isFirstLogin,
      isDuplicateLogin: validResponse.isDuplicateLogin,
    };
  };

  const refresh = async (refreshToken?: string): Promise<RefreshResult> => {
    const token = await requireRefreshToken(refreshToken, getToken);

    const response = await client.post<RefreshResponse>(
      API_ENDPOINTS.AUTH.REFRESH,
      { refreshToken: token }
    );

    const validResponse = assertSuccessfulAuthResponse(
      response,
      "REFRESH",
      401
    );

    const currentRefreshToken = await getToken();
    if (currentRefreshToken) {
      await setCookies(validResponse.accessToken, currentRefreshToken);
    }

    return {
      accessToken: validResponse.accessToken,
    };
  };

  return {
    login,
    refresh,
  };
};

export const authService = createAuthService({
  client: apiClient,
  setAuthCookies,
  getRefreshToken,
});
