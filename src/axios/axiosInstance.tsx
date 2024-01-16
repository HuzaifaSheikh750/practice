import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.REACT_APP_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      originalRequest.url ===
        `${import.meta.env.REACT_APP_BASE_URL}/auth/refresh`
    ) {
      window.location.href = "/login";
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");
      return axiosInstance
        .post("/auth/refresh", { refreshToken: refreshToken })
        .then((res) => {
          if (res.status === 200) {
            localStorage.setItem("token", res.data.token);
            console.log("Access token refreshed!");
            return axiosInstance(originalRequest);
          }
        });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
