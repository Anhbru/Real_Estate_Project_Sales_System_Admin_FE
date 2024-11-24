import {BASE_URL_SERVER} from "../config/server";
import axios from "axios";

const API_ENDPOINT = {
    ADMIN_LIST_FLOOR: "/api/floors",
    ADMIN_DETAIL_FLOOR: "/api/floors/GetFloorbyID/",
    ADMIN_CREATE_FLOOR: "/api/floors",
    ADMIN_UPDATE_FLOOR: "/api/floors/",
    ADMIN_DELETE_FLOOR: "/api/floors/",
}

class FloorService {
    // ADMIN
    adminListFloor = () => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.get(BASE_URL_SERVER + API_ENDPOINT.ADMIN_LIST_FLOOR, config);
    }

    adminDetailFloor = (id) => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.get(BASE_URL_SERVER + API_ENDPOINT.ADMIN_DETAIL_FLOOR + id, config);
    }

    adminCreateFloor = (data) => {
        const config = {
            headers: {
                "content-type": "multipart/form-data",
                Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            },
        };
        return axios.post(BASE_URL_SERVER + API_ENDPOINT.ADMIN_CREATE_FLOOR, data, config);
    };

    adminUpdateFloor = (id, data) => {
        const config = {
            headers: {
                "content-type": "multipart/form-data",
                Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            },
        };
        return axios.put(BASE_URL_SERVER + API_ENDPOINT.ADMIN_UPDATE_FLOOR + id, data, config);
    };

    adminDeleteFloor = (id) => {
        const config = {
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            },
        };
        return axios.delete(BASE_URL_SERVER + API_ENDPOINT.ADMIN_DELETE_FLOOR + id, config);
    };
}

const floorService = new FloorService();
export default floorService;