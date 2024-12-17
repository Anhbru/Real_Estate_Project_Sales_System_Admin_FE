import axios from "axios";
import { BASE_URL_SERVER } from "../config/server";
import { configTokenApi } from "./ContractService";

const API_ENDPOINT = {
  LIST: "/api/bookings",
  CREATE: "/api/bookings",
  UPDATE: "/api/bookings/",
  DELETE: "/api/bookings/",
  DETAIL: "/api/bookings/",
  UPLOAD_PAYMENT_ORDER: "/api/bookings/upload-payment-order/",
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
  uploadPaymentOrder = async (id, fileRefundImage) => {
    const formData = new FormData();
    formData.append("RefundImage", fileRefundImage);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    };

    return await axios.put(
      BASE_URL_SERVER + API_ENDPOINT.UPLOAD_PAYMENT_ORDER + id,
      formData,
      config
    );
  };
}

const bookingService = new BookingService();

export default bookingService;
