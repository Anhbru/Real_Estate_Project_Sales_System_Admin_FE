import axios from "axios";
import { BASE_URL_SERVER } from "../config/server";

const API_ENDPOINT = {
  ADMIN_LIST_OPENFORSALES: "/api/open-for-sales/",
  ADMIN_DETAIL_OPENFORSALE: "/api/open-for-sales/",
  ADMIN_POST_OPENFORSALES: "/api/open-for-sales",
  ADMIN_UPDATE_OPENFORSALES: "/api/open-for-sales/",
  ADMIN_DELETE_OPENFORSALES: "/api/open-for-sales/",
};

class OpenSaleService {
  adminListOpenSales = () => {
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    };
    return axios.get(
      BASE_URL_SERVER + API_ENDPOINT.ADMIN_LIST_OPENFORSALES,
      config
    );
  };

  adminDetailOpenSale = (id) => {
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    };
    return axios.get(
      BASE_URL_SERVER + API_ENDPOINT.ADMIN_DETAIL_OPENFORSALE + id,
      config
    );
  };

  adminCreateOpenSale = (data) => {
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    };
    return axios.post(
      BASE_URL_SERVER + API_ENDPOINT.ADMIN_POST_OPENFORSALES,
      data,
      config
    );
  };

  adminUpdateOpenSale = (id, data) => {
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    };
    return axios.put(
      BASE_URL_SERVER + API_ENDPOINT.ADMIN_UPDATE_OPENFORSALES + id,
      data,
      config
    );
  };

  adminDeleteOpenSale = (id) => {
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    };
    return axios.delete(
      BASE_URL_SERVER + API_ENDPOINT.ADMIN_DELETE_OPENFORSALES + id,
      config
    );
  };
}

const openSaleService = new OpenSaleService();
export default openSaleService;
