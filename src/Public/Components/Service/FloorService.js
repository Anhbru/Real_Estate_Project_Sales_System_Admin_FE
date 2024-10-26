import {BASE_URL_SERVER} from "../config/server";
import axios from "axios";

const API_ENDPOINT = {
    ADMIN_LIST_FLOOR: "/api/floors",
    ADMIN_DETAIL_FLOOR: "/api/floors/",
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
}

const floorService = new FloorService();
export default floorService;