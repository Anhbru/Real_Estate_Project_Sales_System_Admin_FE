import { BASE_URL_SERVER } from "../config/server";
import axios from "axios";

const API_ENDPOINT = {
  ADMIN_LIST_ZONE: "/api/zones",
  ADMIN_DETAIL_ZONE: "/api/zones/",
};

class ZoneService {
  // ADMIN
  adminListZone = () => {
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    };
    return axios.get(BASE_URL_SERVER + API_ENDPOINT.ADMIN_LIST_ZONE, config);
  };

  adminDetailZone = (id) => {
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    };
    return axios.get(
      BASE_URL_SERVER + API_ENDPOINT.ADMIN_DETAIL_ZONE + id,
      config
    );
  };
}

const zoneService = new ZoneService();
export default zoneService;
