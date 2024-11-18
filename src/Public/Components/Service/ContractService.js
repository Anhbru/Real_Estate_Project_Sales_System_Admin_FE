import axios from "axios";
import { BASE_URL_SERVER } from "../config/server";

const API_ENDPOINT = {
  LIST: "/api/contracts",
  CREATE: "/api/contracts",
  UPDATE: "/api/contracts/",
  DELETE: "/api/contracts/",
  DETAIL: "/api/contracts/",
};

export const configTokenApi = {
  headers: {
    "content-type": "application/json",
    Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
  },
};

class ContractService {
  getList = async () => {
    return await axios.get(BASE_URL_SERVER + API_ENDPOINT.LIST, configTokenApi);
  };

  create = async (data) => {
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    };
    return await axios.post(
      BASE_URL_SERVER + API_ENDPOINT.CREATE,
      data,
      config
    );
  };

  getDetail = async (id) => {
    return await axios.get(
      BASE_URL_SERVER + API_ENDPOINT.DETAIL + id,
      configTokenApi
    );
  };

  update = async (data, id) => {
    return await axios.put(
      BASE_URL_SERVER + API_ENDPOINT.UPDATE + id,
      data,
      configTokenApi
    );
  };

  delete = async (id) => {
    return await axios.delete(
      BASE_URL_SERVER + API_ENDPOINT.DELETE + id,
      configTokenApi
    );
  };
}

const contractService = new ContractService();
export default contractService;
