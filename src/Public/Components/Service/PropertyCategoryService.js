import axios from "axios";
import { BASE_URL_SERVER } from "../config/server";

const API_ENDPOINT = {
  LIST: "/api/property-categorys",
};

export const configTokenApi = {
  headers: {
    "content-type": "application/json",
    Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
  },
};

class PropertyCategoryService {
  getList = async () => {
    return await axios.get(BASE_URL_SERVER + API_ENDPOINT.LIST, configTokenApi);
  };
}

const propertyCategoryService = new PropertyCategoryService();
export default propertyCategoryService;
