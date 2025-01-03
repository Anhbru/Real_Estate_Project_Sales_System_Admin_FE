import axios from "axios";
import { BASE_URL_SERVER } from "../config/server";
import { configTokenApi } from "./ContractService";

const API_ENDPOINT = {
  LIST: "/api/staffs",
  CREATE: "/api/staffs",
  UPDATE: "/api/staffs/",
  DELETE: "/api/staffs/",
  DETAIL: "/api/staffs/",
};

class StaffService {
  getList = async () => {
    return await axios.get(BASE_URL_SERVER + API_ENDPOINT.LIST, configTokenApi);
  };

  create = (data) => {
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    };
    return axios.post(BASE_URL_SERVER + API_ENDPOINT.CREATE, data, config);
  };
  update = async (data, id) => {
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    };
    return await axios.put(
      BASE_URL_SERVER + API_ENDPOINT.UPDATE + id,
      data,
      config
    );
  };

  delete = async (id) => {
    return await axios.delete(
      BASE_URL_SERVER + API_ENDPOINT.UPDATE + id,
      configTokenApi
    );
  };

  detail = async (id) => {
    return await axios.get(
      BASE_URL_SERVER + API_ENDPOINT.UPDATE + id,
      configTokenApi
    );
  };
}

const staffService = new StaffService();

export default staffService;
