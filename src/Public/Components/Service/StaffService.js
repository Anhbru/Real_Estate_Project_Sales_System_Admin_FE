import axios from "axios";
import { BASE_URL_SERVER } from "../config/server";
import { configTokenApi } from "./ContractService";

const API_ENDPOINT = {
  LIST: "/api/staffs",
};

class StaffService {
  getList = async () => {
    return await axios.get(BASE_URL_SERVER + API_ENDPOINT.LIST, configTokenApi);
  };
}

const staffService = new StaffService();

export default staffService;
