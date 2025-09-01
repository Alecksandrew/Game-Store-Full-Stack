const API_BASE_URL = "https://localhost:7205";

const API_PATHS = {
  AUTH: "/api/Auth",
  ACCOUNT: "/api/account",
  GAMES: "/api/Games",
  REVIEWS: "/api/games",
};


export const API_ROUTES = {
  AUTH: {
    REGISTER: `${API_BASE_URL}${API_PATHS.AUTH}/register`,
    LOGIN: `${API_BASE_URL}${API_PATHS.AUTH}/login`,
    LOGOUT: `${API_BASE_URL}${API_PATHS.AUTH}/logout`,
    REFRESH_TOKEN: `${API_BASE_URL}${API_PATHS.AUTH}/refresh`,
    CONFIRM_EMAIL: `${API_BASE_URL}${API_PATHS.AUTH}/confirm-email`,
    FORGOT_PASSWORD: `${API_BASE_URL}${API_PATHS.AUTH}/forgot-password`,
    RESET_PASSWORD: `${API_BASE_URL}${API_PATHS.AUTH}/reset-password`,
  },
  ACCOUNT: {
    ME: `${API_BASE_URL}${API_PATHS.ACCOUNT}/me`,
  },
  GAMES: {
    GET: `${API_BASE_URL}${API_PATHS.GAMES}`,
    GET_BY_ID: `${API_BASE_URL}${API_PATHS.GAMES}`,//path parameter gameId
  },
  REVIEWS: {
    GET_BY_GAME_FUNCTION: (gameId:number) => `${API_BASE_URL}${API_PATHS.REVIEWS}/${gameId}/reviews`,
    GET_MY_REVIEWS_BY_GAME_FUNCTION: (gameId:number) => `${API_BASE_URL}${API_PATHS.REVIEWS}/${gameId}/reviews/me`,
    CREATE_MY_REVIEW_BY_GAME_FUNCTION: (gameId:number) => `${API_BASE_URL}${API_PATHS.REVIEWS}/${gameId}/reviews`, 
  }
};