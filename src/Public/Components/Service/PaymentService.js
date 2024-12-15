import {BASE_URL_SERVER} from "../config/server";
import axios from "axios";

const API_ENDPOINT = {
    ADMIN_LIST: "/api/payments",
    ADMIN_DETAIL: "/api/payments/",
    ADMIN_POST: "/api/payments",
    ADMIN_UPDATE: "/api/payments/",
    ADMIN_DELETE: "/api/payments/",
};

class PaymentService {
    // ADMIN
    adminList = (page) => {
        const config = {
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            },
        };
        return axios.get(
            BASE_URL_SERVER + API_ENDPOINT.ADMIN_LIST + "?page=" + page,
            config
        );
    };

    adminDetail = (id) => {
        const config = {
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            },
        };
        return axios.get(
            BASE_URL_SERVER + API_ENDPOINT.ADMIN_DETAIL + id,
            config
        );
    };

    adminCreate = (data) => {
        const config = {
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            },
        };
        return axios.post(
            BASE_URL_SERVER + API_ENDPOINT.ADMIN_POST,
            data,
            config
        );
    };

    adminUpdate = (id, data) => {
        const config = {
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            },
        };
        return axios.put(
            BASE_URL_SERVER + API_ENDPOINT.ADMIN_UPDATE + id,
            data,
            config
        );
    };

    adminDelete = (id) => {
        const config = {
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            },
        };
        return axios.delete(
            BASE_URL_SERVER + API_ENDPOINT.ADMIN_DELETE + id,
            config
        );
    };
}

const paymentService = new PaymentService();
export default paymentService;