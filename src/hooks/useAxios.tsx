import axios, { AxiosError } from "axios";

export const useAxios = (withAuth = true) => {
  const access_token = localStorage.getItem("access_token");
  const instance = axios.create({
    baseURL: import.meta.env.VITE_PUBLIC_API,
  });

  if (withAuth && access_token) {
    instance.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
  }

  instance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        localStorage.clear();
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }
  );

  return instance;
};
