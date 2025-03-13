import { apiHandler } from "../utils/apiHandler";
import axiosInstance from "../utils/axiosInstance";

export const fetchProfile = async () => {
  return apiHandler(() => axiosInstance.get("/user"), {
    // showErrorToast: true,
    // showSuccessToast: true,
  });
};

