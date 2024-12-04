import axios from "axios";
import { useStore } from "./src/store/store";
const REACT_APP_BASE_URL = "https://aqvo.limsa.uz/";


const api = axios.create({
  baseURL: REACT_APP_BASE_URL,
});

api.interceptors.request.use(
    (config) => {
      const accessToken = JSON.parse(localStorage.getItem("user-store-aqvo"))?.state?.accessToken;
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
        console.log(error);
        
      const originalRequest = error.config;
      if (error.response?.status === 401) {
        // originalRequest._retry = true;
        console.log("401");
        
        const { refreshToken, clearUser, updateTokens } = useStore.getState();  
        console.log(refreshToken);
        
        console.log("sdas");
        if (refreshToken) {
          try {
            const refreshResponse = await axios.get(`${REACT_APP_BASE_URL}api/auth/refresh?refresh_token=${refreshToken}`);
            console.log(refreshResponse?.data?.data?.tokens);

            const newAccessToken = refreshResponse?.data?.data?.tokens?.access_token;
            const newRefreshToken = refreshResponse?.data?.data?.tokens?.refresh_token;
            
            
            if (newAccessToken && newRefreshToken) {
              // Update user state and localStorage with new tokens
              updateTokens(newAccessToken, newRefreshToken);
             
              api.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
              originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
  
              return api(originalRequest);  
            }
          } catch (refreshError) {
            console.error("Error refreshing token:", refreshError);
            clearUser()
          }
        } else {
          console.log("No refresh token");
        }
      }
      return Promise.reject(error);
    }
  );

export default api;