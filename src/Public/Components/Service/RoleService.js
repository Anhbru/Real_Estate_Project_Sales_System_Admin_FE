import axios from "axios";
import { BASE_URL_SERVER } from "../config/server";
import { configTokenApi } from "./ContractService";

const API_ENDPOINT = {
  LIST: "/api/roles",
  DETAIL: "/api/roles/",
};

class RoleService {
  getList = async () => {
    return await axios.get(BASE_URL_SERVER + API_ENDPOINT.LIST, configTokenApi);
  };


  detail = async (id) => {
    return await axios.get(
      BASE_URL_SERVER + API_ENDPOINT.DETAIL + id,
      configTokenApi
    );
  };
}

const roleService = new RoleService();

export default roleService;
