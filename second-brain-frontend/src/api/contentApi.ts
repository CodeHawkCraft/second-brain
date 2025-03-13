import { activeTabValidValues } from "../Components/SideBar";
import { AddcontentType } from "../pages/DashboardContent";
import { apiHandler } from "../utils/apiHandler";
import axiosInstance from "../utils/axiosInstance";
import { SearchContentOptionType } from "../utils/type";

export const getContent = (filterOption:activeTabValidValues,searchWord?:string,searchOption?:SearchContentOptionType,isDeepSearch?:boolean) => {

  let url = `/content/${filterOption}`;
  if (searchOption) url += `/${searchOption}`;
  if (searchWord) url += `/${searchWord}`;
  if(isDeepSearch){url+=`/${isDeepSearch}`};

  return apiHandler(() => axiosInstance.get(url), {
    });
  };
  

  export const deleteContent = (contentId:string) => {
    return apiHandler(() => axiosInstance.delete(`/content/${contentId}`), {
      showErrorToast: true,
      showSuccessToast: true,
    });
  };
  

  export const createContent = (values:AddcontentType) => {
    return apiHandler(() => axiosInstance.post(`/content`,values), {
      showErrorToast: true,
      showSuccessToast: true,
    });
  };
  