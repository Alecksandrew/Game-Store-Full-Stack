const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const API_PATHS = {
  AUTH: "/api/Auth",
  ACCOUNT: "/api/account",
  GAMES: "/api/Games",
  REVIEWS:"/api/Reviews",
  REVIEWS_NOT_STANDARD_URL: "/api/games",
  WISHLIST: "/api/Wishlist",
  CHECKOUT: "/api/Checkout" ,
  ADMIN: "/api/admin"
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
    GET_BY_GAME_FUNCTION: (gameId:number) => `${API_BASE_URL}${API_PATHS.REVIEWS_NOT_STANDARD_URL}/${gameId}/reviews`,
    GET_MY_REVIEWS_BY_GAME_FUNCTION: (gameId:number) => `${API_BASE_URL}${API_PATHS.REVIEWS_NOT_STANDARD_URL}/${gameId}/reviews/me`,
    CREATE_MY_REVIEW_BY_GAME_FUNCTION: (gameId:number) => `${API_BASE_URL}${API_PATHS.REVIEWS_NOT_STANDARD_URL}/${gameId}/reviews`, 
    UPDATE_MY_REVIEW_BY_GAME_FUNCTION: (reviewId:number) => `${API_BASE_URL}${API_PATHS.REVIEWS}/${reviewId}`,
    DELETE_MY_REVIEW_BY_GAME_FUNCTION:(reviewId:number) => `${API_BASE_URL}${API_PATHS.REVIEWS}/${reviewId}`,
  },
   WISHLIST: {
    GET: `${API_BASE_URL}${API_PATHS.WISHLIST}`,
    ADD_FUNCTION: (gameId:number) => `${API_BASE_URL}${API_PATHS.WISHLIST}/${gameId}`, 
    REMOVE_FUNCTION:(gameId:number) => `${API_BASE_URL}${API_PATHS.WISHLIST}/${gameId}`,
  },
  CHECKOUT: {
    PROCESS: `${API_BASE_URL}${API_PATHS.CHECKOUT}`
  },
  ADMIN: {
    GET_INVENTORY: `${API_BASE_URL}${API_PATHS.ADMIN}/inventory`,
    ADD_KEYS_FUNCTION: (gameId: number) => `${API_BASE_URL}${API_PATHS.ADMIN}/inventory/${gameId}/keys`,
  }
};