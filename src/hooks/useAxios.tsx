import axios from "axios";

export const useAxios = (withAuth = true) => {
  const access_token = localStorage.getItem("access_token");
  const instance = axios.create({
    baseURL: import.meta.env.VITE_PUBLIC_API,
  });

  if (withAuth && access_token) {
    instance.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
  }

  return instance;
};
