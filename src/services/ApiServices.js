import axios from "axios";
import { getToken } from "./AuthService";
import { toast } from "react-toastify";

const ApiService = {
  baseurl: import.meta.env.VITE_API_BASE_URL,

  postRequest: async (data) => {
    axios.defaults.headers.common["access-token"] = getToken();
    const { path, payload } = data;

    try {
      const response = await axios.post(
        `${ApiService.baseurl}${path}`,
        payload
      );
      return response;
    } catch (error) {
      const msg = error.response?.data?.message || "Something went wrong!";
      toast.error(msg);
    }
  },

  getRequest: async (path = "") => {
    try {
      const response = await axios.get(`${ApiService.baseurl}${path}`);
      return response.data;
    } catch (error) {
      const msg = error.response?.data?.message || "Something went wrong!";
      toast.error(msg);
      throw error;
    }
  },
};

export default ApiService;
