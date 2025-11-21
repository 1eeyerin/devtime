import {
  ConfigurationError,
  UnauthorizedError,
  ERROR_MESSAGES,
} from "@/shared/api/error";
import {
  buildRequestOptions,
  buildUrl,
  requestJson,
  RequestConfig,
} from "@/shared/api/client";
import { getAccessToken } from "@/shared/auth";

type Headers = Record<string, string>;

type FetchAccessToken = () => Promise<string | null>;

export class ApiClient {
  constructor(private readonly backendUrl?: string) {
    if (!backendUrl) {
      throw new ConfigurationError(ERROR_MESSAGES.SERVER.BACKEND_URL_NOT_SET);
    }
  }

  async request<T>(endpoint: string, config: RequestConfig = {}): Promise<T> {
    const { method = "GET", headers = {}, body } = config;
    const preparedHeaders = await this.prepareHeaders(headers);
    const url = buildUrl(this.backendUrl as string, endpoint);
    const requestOptions = buildRequestOptions(method, preparedHeaders, body);

    return requestJson<T>(url, requestOptions);
  }

  get<T>(endpoint: string, headers?: Headers) {
    return this.request<T>(endpoint, { method: "GET", headers });
  }

  post<T>(endpoint: string, body?: unknown, headers?: Headers) {
    return this.request<T>(endpoint, { method: "POST", body, headers });
  }

  put<T>(endpoint: string, body?: unknown, headers?: Headers) {
    return this.request<T>(endpoint, { method: "PUT", body, headers });
  }

  delete<T>(endpoint: string, headers?: Headers) {
    return this.request<T>(endpoint, { method: "DELETE", headers });
  }

  protected async prepareHeaders(headers: Headers = {}): Promise<Headers> {
    return headers;
  }
}

export class AuthorizedApiClient extends ApiClient {
  constructor(
    backendUrl: string | undefined,
    private readonly fetchAccessToken: FetchAccessToken
  ) {
    super(backendUrl);
  }

  protected override async prepareHeaders(headers: Headers = {}) {
    const accessToken = await this.fetchAccessToken();
    if (!accessToken) {
      throw new UnauthorizedError();
    }

    return {
      Authorization: `Bearer ${accessToken}`,
      ...headers,
    };
  }
}

const backendUrl = process.env.BACKEND_URL;

export const apiClient = new ApiClient(backendUrl);
export const authorizedApiClient = new AuthorizedApiClient(
  backendUrl,
  getAccessToken
);
