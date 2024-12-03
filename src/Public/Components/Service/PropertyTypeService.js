import { BASE_URL_SERVER } from "../config/server";
import axios from "axios";

const API_ENDPOINT = {
  ADMIN_LIST_PROPERTY: "/api/property-types",
  ADMIN_DETAIL_PROPERTY: "/api/property-types/",
  ADMIN_POST_PROPERTY: "/api/property-types",
  ADMIN_UPDATE_PROPERTY: "/api/property-types/",
  ADMIN_DETELE_PROPERTY: "/api/property-types/",
};

class PropertyTypeService {
  // ADMIN
  adminListProperty = () => {
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    };
    return axios.get(
      BASE_URL_SERVER + API_ENDPOINT.ADMIN_LIST_PROPERTY,
      config
    );
  };

  adminDetailProperty = (id) => {
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    };
    return axios.get(
      BASE_URL_SERVER + API_ENDPOINT.ADMIN_DETAIL_PROPERTY + id,
      config
    );
  };

  adminCreateProperty = (data) => {
    const config = {
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
      }
    };
    return axios.post(BASE_URL_SERVER + API_ENDPOINT.ADMIN_POST_PROPERTY, data, config);
  };
  adminUpdateProperty = (id, data) => {
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
      }
    };
    return axios.put(BASE_URL_SERVER + API_ENDPOINT.ADMIN_UPDATE_PROPERTY + id, data, config)
  };
  adminDeleteProperty = (id) => {
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    };
    return axios.delete(
      BASE_URL_SERVER + API_ENDPOINT.ADMIN_DETAIL_PROPERTY + id,
      config
    );
  };
}



const propertyTypeService = new PropertyTypeService();
export default propertyTypeService;
