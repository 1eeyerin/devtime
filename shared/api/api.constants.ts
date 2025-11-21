export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/api/auth/login",
    REFRESH: "/api/auth/refresh",
    LOGOUT: "/api/auth/logout",
  },
} as const;

export const SUCCESS_MESSAGES = {
  AUTH: {
    LOGOUT: "로그아웃되었습니다.",
  },
} as const;
