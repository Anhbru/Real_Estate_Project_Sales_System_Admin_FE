import {BASE_URL_SERVER} from "../config/server";
import axios from "axios";

const API_ENDPOINT = {
    ADMIN_LIST_ZONE: "/api/zones",
    ADMIN_DETAIL_ZONE: "/api/zones/GetZonebyID/",
    ADMIN_CREATE_ZONE: "/api/zones",
    ADMIN_UPDATE_ZONE: "/api/zones/",
    ADMIN_DELETE_ZONE: "/api/zones/",
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

    adminCreateZone = (data) => {
        const config = {
            headers: {
                "content-type": "multipart/form-data",
                Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            },
        };
        return axios.post(BASE_URL_SERVER + API_ENDPOINT.ADMIN_CREATE_ZONE, data, config);
    };

    adminUpdateZone = (id, data) => {
        const config = {
            headers: {
                "content-type": "multipart/form-data",
                Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            },
        };
        return axios.put(BASE_URL_SERVER + API_ENDPOINT.ADMIN_UPDATE_ZONE + id, data, config);
    };

    adminDeleteZone = (id) => {
        const config = {
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            },
        };
        return axios.delete(BASE_URL_SERVER + API_ENDPOINT.ADMIN_DELETE_ZONE + id, config);
    };
}

const zoneService = new ZoneService();
export default zoneService;
