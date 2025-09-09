import axios, { type AxiosError } from "axios";
import { toast } from "sonner";
// import { handleAxiosError } from "~/lib/utils"
// import { useLocalStore } from "~/store/data"

const API_URL = import.meta.env.VITE_API_URL || "https://loro-ai.com";

// TODO: Uncomment when token refresh is needed
// let isRefreshing = false
// let failedQueue: { resolve: (token: string) => void; reject: (error: any) => void }[] = []

// const processQueue = (error: any, token: string | null = null): void => {
//   failedQueue.forEach((prom) => {
//     if (error) {
//       prom.reject(error)
//     } else {
//       prom.resolve(token!)
//     }
//   })
//   failedQueue = []
// }

// export const handleTokenRefresh = async (): Promise<string> => {
//   if (isRefreshing) {
//     return new Promise((resolve, reject) => {
//       failedQueue.push({ resolve, reject })
//     })
//   }

//   isRefreshing = true

//   try {
//     const refreshToken = localStorage.getItem("refresh_token")
//     const user = useLocalStore.getState().user

//     if (!refreshToken || !user) {
//       const logout = useLocalStore.getState().logout
//       logout()
//       window.location.href = "/login"
//       const error = new Error("No refresh token or user found.")
//       processQueue(error, null)
//       return Promise.reject(error)
//     }

//     const response = await axios.post(`${API_URL}/auth/refresh`, {
//       email: user.email,
//       refresh_token: refreshToken,
//     })

//     const { access_token: newToken } = response.data

//     useLocalStore.getState().setCredentials({
//       user,
//       token: newToken,
//       refreshToken,
//     })

//     processQueue(null, newToken)
//     return newToken
//   } catch (refreshError) {
//     processQueue(refreshError, null)
//     toast.error("Session expired. Please log in again.")
//     const logout = useLocalStore.getState().logout
//     logout()
//     window.location.href = "/login"
//     return Promise.reject(refreshError)
//   } finally {
//     isRefreshing = false
//   }
// }

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Basic request interceptor
api.interceptors.request.use(
  (config) => {
    // TODO: Uncomment when authentication is needed
    // const token = localStorage.getItem("token")
    // if (token && !config.headers.Authorization) {
    //   config.headers.Authorization = `Bearer ${token}`
    // }

    // Basic logging for debugging
    console.log(
      `Making ${config.method?.toUpperCase()} request to: ${config.url}`
    );

    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Basic response interceptor
api.interceptors.response.use(
  (response) => {
    // Log successful responses
    console.log(`Response from ${response.config.url}:`, response.status);
    toast.success("Call successful");
    return response;
  },
  async (error: AxiosError) => {
    // TODO: Uncomment when token refresh is needed
    // const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean }

    // if (
    //   (error.response?.status === 401 || error.response?.status === 403) &&
    //   !originalRequest._retry
    // ) {
    //   originalRequest._retry = true
    //   try {
    //     const newToken = await handleTokenRefresh()
    //     if (originalRequest.headers) {
    //       originalRequest.headers.Authorization = `Bearer ${newToken}`
    //     }
    //     return api.request(originalRequest)
    //   } catch (refreshError) {
    //     return Promise.reject(refreshError)
    //   }
    // }

    // if (error.response?.status !== 401 && error.response?.status !== 403) {
    //   handleAxiosError(error)
    // }

    // Basic error handling
    console.error("API Error:", {
      status: error.response?.status,
      message: error.response?.data || error.message,
      url: error.config?.url,
    });
    toast.error("API Error");

    return Promise.reject(error);
  }
);

export { api };
