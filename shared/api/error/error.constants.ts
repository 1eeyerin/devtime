export const ERROR_MESSAGES = {
  VALIDATION: {
    DEFAULT: "입력값을 확인해주세요.",
    EMAIL_PASSWORD_REQUIRED: "이메일과 비밀번호를 입력해주세요.",
    REFRESH_TOKEN_REQUIRED: "리프레시 토큰이 없습니다.",
  },
  AUTH: {
    UNAUTHORIZED: "인증이 필요합니다.",
    LOGIN_FAILED: "로그인에 실패했습니다.",
    REFRESH_FAILED: "토큰 갱신에 실패했습니다.",
  },
  SERVER: {
    DEFAULT: "서버 오류가 발생했습니다.",
    CONFIGURATION: "서버 설정 오류가 발생했습니다.",
    BACKEND_URL_NOT_SET: "BACKEND_URL이 설정되지 않았습니다.",
    BACKEND_API_REQUEST_FAILED: "백엔드 API 요청에 실패했습니다.",
    BACKEND_API_COMMUNICATION_FAILED: "백엔드 API 통신 중 오류가 발생했습니다.",
  },
  NOT_FOUND: {
    DEFAULT: "리소스를 찾을 수 없습니다.",
  },
} as const;
