import {BASE_URL_SERVER} from "../config/server";
import axios from "axios";

const API_ENDPOINT = {
    ADMIN_LIST_UNIT: "/api/unit-types",
    ADMIN_DETAIL_UNIT: "/api/unit-types/",
    ADMIN_CREATE_UNIT: "/api/unit-types",
    ADMIN_UPDATE_UNIT: "/api/unit-types/",
    ADMIN_DELETE_UNIT: "/api/unit-types/",
};

class UnitTypeService {
    // ADMIN
    adminListUnit = () => {
        const config = {
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            },
        };
        return axios.get(BASE_URL_SERVER + API_ENDPOINT.ADMIN_LIST_UNIT, config);
    };

    adminDetailUnit = (id) => {
        const config = {
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            },
        };
        return axios.get(
            BASE_URL_SERVER + API_ENDPOINT.ADMIN_DETAIL_UNIT + id,
            config
        );
    };

    adminCreateUnit = (data) => {
        const config = {
            headers: {
                "content-type": "multipart/form-data",
                Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            },
        };
        return axios.post(BASE_URL_SERVER + API_ENDPOINT.ADMIN_CREATE_UNIT, data, config);
    };

    adminUpdateUnit = (id, data) => {
        const config = {
            headers: {
                "content-type": "multipart/form-data",
                Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            },
        };
        return axios.put(BASE_URL_SERVER + API_ENDPOINT.ADMIN_UPDATE_UNIT + id, data, config);
    };

    adminDeleteUnit = (id) => {
        const config = {
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            },
        };
        return axios.delete(BASE_URL_SERVER + API_ENDPOINT.ADMIN_DELETE_UNIT + id, config);
    };
}

const unitTypeService = new UnitTypeService();
export default unitTypeService;
