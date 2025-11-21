import { ApiError, BackendApiError, ERROR_MESSAGES } from "@/shared/api/error";

export const buildUrl = (baseUrl: string, endpoint: string): string =>
  `${baseUrl}${endpoint}`;

export const buildRequestOptions = (
  method: string,
  headers: Record<string, string>,
  body?: unknown
): RequestInit => ({
  method,
  headers: {
    "Content-Type": "application/json",
    ...headers,
  },
  ...(body ? { body: JSON.stringify(body) } : {}),
});

const buildBackendError = (status: number, data: unknown) => {
  const message =
    (data as { message?: string })?.message ||
    ERROR_MESSAGES.SERVER.BACKEND_API_REQUEST_FAILED;

  return new BackendApiError(message, status, data);
};

const parseJsonResponse = async (response: Response) => {
  const data = await response.json();

  if (!response.ok) {
    throw buildBackendError(response.status, data);
  }

  return data;
};

export const requestJson = async <T>(
  url: string,
  options: RequestInit
): Promise<T> => {
  try {
    const response = await fetch(url, options);
    const data = await parseJsonResponse(response);

    return data as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    throw new BackendApiError(
      ERROR_MESSAGES.SERVER.BACKEND_API_COMMUNICATION_FAILED,
      500,
      error
    );
  }
};
