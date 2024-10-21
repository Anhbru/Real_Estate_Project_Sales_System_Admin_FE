import {BASE_URL_SERVER} from "../config/server";
import axios from "axios";

const API_ENDPOINT = {
    ADMIN_LIST_PROPERTY: "/api/property-types",
    ADMIN_DETAIL_PROPERTY: "/api/property-types/",
}

class PropertyTypeService {
    // ADMIN
    adminListProperty = () => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.get(BASE_URL_SERVER + API_ENDPOINT.ADMIN_LIST_PROPERTY, config);
    }

    adminDetailProperty = (id) => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.get(BASE_URL_SERVER + API_ENDPOINT.ADMIN_DETAIL_PROPERTY + id, config);
    }
}

const propertyTypeService = new PropertyTypeService();
export default propertyTypeService;