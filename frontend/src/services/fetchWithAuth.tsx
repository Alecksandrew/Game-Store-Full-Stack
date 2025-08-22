import { AUTH_URL } from "../BACKEND_URL";

function handleUnauthorized() {
  localStorage.removeItem('jwtToken');
  localStorage.removeItem('refreshToken');
  window.location.href = '/'; 
}

async function getNewAccessToken() {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) {
    throw new Error("No refresh token found");
  }

  const response = await fetch(`${AUTH_URL}/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refreshToken }),
  });

  if (!response.ok) {
    handleUnauthorized();
    throw new Error("Failed to refresh token");
  }

  const { jwtToken, refreshToken: newRefreshToken } = await response.json();

  localStorage.setItem('jwtToken', jwtToken);
  localStorage.setItem('refreshToken', newRefreshToken);

  return jwtToken;
}


export async function fetchWithAuth(url:string, options = {}) {

  const token = localStorage.getItem('jwtToken');

  if (!options.headers) {
    options.headers = {};
  }
  options.headers['Authorization'] = `Bearer ${token}`;
  options.headers['Content-Type'] = 'application/json';

  let response = await fetch(url, options);


  if (response.status === 401) {
    console.log("Access token expired. Attempting to refresh...");
    try {

      const newAccessToken = await getNewAccessToken();
      
      options.headers['Authorization'] = `Bearer ${newAccessToken}`;


      console.log("Retrying the original request with new token...");
      response = await fetch(url, options);

    } catch (error) {
      console.error("Session expired. Logging out.", error);
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('refreshToken');
      window.location.href = '/';
      
      return Promise.reject(error);
    }
  }

  return response;
}