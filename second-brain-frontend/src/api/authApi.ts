import { apiHandler } from "../utils/apiHandler";
import axiosInstance from "../utils/axiosInstance";

export const login = async (credentials: {
  username: string;
  password: string;
}) => {
  return apiHandler(() => axiosInstance.post("/auth/signin", credentials), {
    showErrorToast: true,
    showSuccessToast: true,
  });
};

export const signUp = (userData: { username: string; password: string }) => {
  return apiHandler(() => axiosInstance.post("/auth/signup", userData), {
    showErrorToast: true,
    showSuccessToast: true,
  });
};

export const logOut = () => {
  return apiHandler(() => axiosInstance.post("/auth/logout"), {
    showErrorToast: true,
    showSuccessToast: true,
  });
};
