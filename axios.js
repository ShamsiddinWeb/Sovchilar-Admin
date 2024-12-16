import axios from "axios";
import { useStore } from "./src/store/store";
const REACT_APP_BASE_URL = "https://sovchilar.limsa.uz/api/";

const api = axios.create({
  baseURL: REACT_APP_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const accessToken = JSON.parse(localStorage.getItem("user-store-sovchilar"))
      ?.state?.accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
// Response interceptor to handle token refresh on 401 errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401) {
      const { refreshToken, clearUser, updateTokens } = useStore?.getState();
      if (refreshToken) {
        try {
          const refreshResponse = await axios.post(
            `${REACT_APP_BASE_URL}auth/refresh`,
            {
              refreshToken: refreshToken,
            }
          );
          console.log(refreshResponse?.data);

          const newAccessToken =
            refreshResponse?.data?.accessToken;
          const newRefreshToken =
            refreshResponse?.data?.refreshToken;

          if (newAccessToken && newRefreshToken) {
            // Update user state and localStorage with new tokens
            updateTokens(newAccessToken, newRefreshToken);

            api.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

            return api(originalRequest);
          }
        } catch (refreshError) {
          console.error("Error refreshing token:", refreshError);
          clearUser();
        }
      } else {
        console.log("No refresh token");
      }
    }
    return Promise.reject(error);
  }
);

export default api;
