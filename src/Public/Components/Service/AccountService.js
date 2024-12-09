import axios from "axios";
import { BASE_URL_SERVER } from "../config/server";
import { configTokenApi } from "./ContractService";

const API_ENDPOINT = {
  LIST: "/api/accounts",
  CREATE: "/api/accounts",
  UPDATE: "/api/accounts/",
  DELETE: "/api/accounts/",
  DETAIL: "/api/accounts/",
};

class AccountService {
  getList = async () => {
    return await axios.get(BASE_URL_SERVER + API_ENDPOINT.LIST, configTokenApi);
  };

  create = async (data) => {  
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    };
    return await axios.post(
      BASE_URL_SERVER + API_ENDPOINT.CREATE,
      data,
      config
    );
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

const accountService = new AccountService();

export default accountService;
