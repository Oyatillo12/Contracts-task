import { LoginType } from "../types";
import { useAxios } from "./useAxios";
import { saveAccessToken } from "../utils/token-service";

export const useLogin = async (user: LoginType) => {
  const res = await useAxios(false).post("/auth/sign-in", user);
  if (res.data.data.accessToken) {
    saveAccessToken(res.data.data.accessToken);
  }
  return res.data;
};
