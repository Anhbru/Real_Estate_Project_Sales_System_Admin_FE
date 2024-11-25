import {BASE_URL_SERVER} from "../config/server";
import axios from "axios";

const API_ENDPOINT = {
    ADMIN_LIST_BLOCK: "/api/blocks",
    ADMIN_DETAIL_BLOCK: "/api/blocks/",
    ADMIN_CREATE_BLOCK: "/api/blocks",
    ADMIN_UPDATE_BLOCK: "/api/blocks/",
    ADMIN_DELETE_BLOCK: "/api/blocks/",

}

class BlockService {
    // ADMIN
    adminListBlock = () => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.get(BASE_URL_SERVER + API_ENDPOINT.ADMIN_LIST_BLOCK, config);
    }

    adminDetailBlock = (id) => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.get(BASE_URL_SERVER + API_ENDPOINT.ADMIN_DETAIL_BLOCK + id, config);
    }

    adminCreateBlock = (data) => {
        const config = {
            headers: {
                "content-type": "multipart/form-data",
                Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            },
        };
        return axios.post(BASE_URL_SERVER + API_ENDPOINT.ADMIN_CREATE_BLOCK, data, config);
    };

    adminUpdateBlock = (id, data) => {
        const config = {
            headers: {
                "content-type": "multipart/form-data",
                Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            },
        };
        return axios.put(BASE_URL_SERVER + API_ENDPOINT.ADMIN_UPDATE_BLOCK + id, data, config);
    };

    adminDeleteBlock = (id) => {
        const config = {
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            },
        };
        return axios.delete(BASE_URL_SERVER + API_ENDPOINT.ADMIN_DELETE_BLOCK + id, config);
    };
}

const blockService = new BlockService();
export default blockService;