import { apiHandler } from "../utils/apiHandler";
import axiosInstance from "../utils/axiosInstance";

export const fetchProfile = async () => {
  return apiHandler(() => axiosInstance.get("/user"), {
  });
};

export const updateUserName = async (userName:string) => {
  return apiHandler(() => axiosInstance.patch(`user/${userName}`), {
    showSuccessToast:true,
    showErrorToast:true
  });
};
