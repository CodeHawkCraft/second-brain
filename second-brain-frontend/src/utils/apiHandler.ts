import axios from "axios";
import toast from "react-hot-toast";

type ApiHandlerOptions = {
  showErrorToast?: boolean;
  showSuccessToast?: boolean;
};
export const apiHandler = async <T>(
  request: () => Promise<{ data: { data: T; message: string } }>,
  options: ApiHandlerOptions = {
    showErrorToast: false,
    showSuccessToast: false,
  }
): Promise<T> => {
  try {
    const response = await request();

    if (options.showSuccessToast) {
      const message = response.data?.message || "Operation successful!";
      toast.success(message);
    }

    return response.data.data;
  } catch (error) {
    console.log("error inside async handler is ------> ",error)
    if (options.showErrorToast) {
      let errorMessage = "Something went wrong";
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || errorMessage;
      }
      console.log("error Message is ------> ",errorMessage)
      toast.error(errorMessage);
    }

    throw error;
  }
};
