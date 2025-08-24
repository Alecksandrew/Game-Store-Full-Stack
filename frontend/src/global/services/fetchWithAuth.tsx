import { API_ROUTES } from "@/global/constants/BACKEND_URL";
import { PAGE_ROUTES } from "../constants/FRONTEND_URL";

function handleUnauthorized() {
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("refreshToken");
  window.location.href = PAGE_ROUTES.AUTH.LOGIN;
}

async function getNewAccessToken() {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) {
    throw new Error("No refresh token found");
  }

  const response = await fetch(API_ROUTES.AUTH.REFRESH_TOKEN, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken }),
  });

  if (!response.ok) {
    handleUnauthorized();
    throw new Error("Failed to refresh token");
  }

  const { jwtToken, refreshToken: newRefreshToken } = await response.json();

  localStorage.setItem("jwtToken", jwtToken);
  localStorage.setItem("refreshToken", newRefreshToken);

  return jwtToken;
}

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = localStorage.getItem("jwtToken");

  const mutableOptions: RequestInit = { ...options };

  mutableOptions.headers = new Headers(options.headers);

  mutableOptions.headers.set("Authorization", `Bearer ${token}`);
  mutableOptions.headers.set("Content-Type", "application/json");

  let response = await fetch(url, mutableOptions);

  if (response.status === 401) {
    console.log("Access token expired. Attempting to refresh...");
    try {
      const newAccessToken = await getNewAccessToken();

      mutableOptions.headers.set("Authorization", `Bearer ${newAccessToken}`);

      console.log("Retrying the original request with new token...");
      response = await fetch(url, mutableOptions);
    } catch (error) {
      console.error("Session expired. Logging out.", error);
      handleUnauthorized();
      return Promise.reject(error);
    }
  }

  return response;
}
