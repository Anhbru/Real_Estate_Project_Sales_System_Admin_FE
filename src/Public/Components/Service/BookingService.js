import axios from "axios";
import { BASE_URL_SERVER } from "../config/server";
import { configTokenApi } from "./ContractService";

const API_ENDPOINT = {
  LIST: "/api/bookings",
  CREATE: "/api/bookings",
  UPDATE: "/api/bookings/",
  DELETE: "/api/bookings/",
  DETAIL: "/api/bookings/",
};

class BookingService {
  getList = async () => {
    return await axios.get(BASE_URL_SERVER + API_ENDPOINT.LIST, configTokenApi);
  };

  create = async (data) => {
    return await axios.post(
      BASE_URL_SERVER + API_ENDPOINT.CREATE,
      data,
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

const bookingService = new BookingService();

export default bookingService;
